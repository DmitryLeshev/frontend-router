import * as React from "react";
import {
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  createStyles,
  Chip,
  CircularProgress,
} from "@material-ui/core";
import { EditIcon, HighlightOffIcon } from "shared/assets/icons";
import {
  IconButton,
  Input,
  Select,
  Button,
  Typography,
} from "shared/ui/components";
import { Modal, Placeholder } from "shared/components";
import { useInput, useModal, useSelect } from "shared/hooks";
import { ITheme } from "shared/ui/theme/theme";

import { cubicApi } from "shared/api";
import { AddFirewallDTO, Rule } from "shared/api/cubic/setting";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { ipString, required } from "shared/utils/validations";

const MODULE: any = {
  0: "firewall",
};

const TYPE: any = {
  0: "redirect",
  1: "forwarding",
  2: "nat",
  3: "rule",
};

type Rules = Rule[];

export default function BasicTable() {
  const classes = useStyles();

  const { t } = useTranslation();

  const [firwallList, setFirewallList] = React.useState<Rules>([]);

  const name = useInput("", {
    label: t("settings:name"),
    validations: [required],
  });
  const dest_port = useInput("", {
    label: t("settings:dest_port"),
    validations: [required],
  });
  const dest_ip = useInput("", {
    label: t("settings:dest_ip"),
    validations: [required, ipString],
  });
  const src_dport = useInput("", {
    label: t("settings:src_dport"),
    validations: [required],
  });
  const src_ip = useInput("", {
    label: t("settings:src_ip"),
    validations: [ipString],
  });

  const [addFirewallIsLoading, addFirewallSetIsLoading] =
    React.useState<boolean>(false);
  const addBtnDisabled: boolean =
    !!name.error ||
    !name.touched ||
    !!dest_port.error ||
    !dest_port.touched ||
    !!dest_ip.error ||
    !dest_ip.touched ||
    !!src_dport.error ||
    !src_dport.touched ||
    !!src_ip.error ||
    !src_ip.touched ||
    addFirewallIsLoading;

  async function getFirewall() {
    const res = await cubicApi.setting.getFirewall();
    console.log("GET_FIREWALL", res);
    if (!res.data?.redirect) return;
    let list: Rule[] = [];
    Object.entries(res.data.redirect).forEach(([_, value]) => {
      // value.forEach((rule) => list.push(rule));
      list.push(value);
    });
    setFirewallList(list);
  }

  React.useEffect(() => {
    getFirewall();
  }, []);

  async function addFirewall(dto: AddFirewallDTO) {
    addFirewallSetIsLoading(true);
    const res = await cubicApi.setting.addFirewall(dto);
    console.log({ addFirewall: res });
    await getFirewall();
    name.onChange();
    dest_port.onChange();
    dest_ip.onChange();
    src_dport.onChange();
    src_ip.onChange();
    addFirewallSetIsLoading(false);
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Правило</TableCell>
            <TableCell>Устройство</TableCell>
            <TableCell align="center">Исходный порт</TableCell>
            <TableCell align="center">Внешний порт</TableCell>
            <TableCell align="center">Белый список IP-адресов</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {firwallList.map((row, index) => (
            <FirewallRow
              key={index}
              row={row}
              addFirewall={addFirewall}
              getFirewall={getFirewall}
            />
          ))}
        </TableBody>
      </Table>
      {!firwallList.length && (
        <div className={classes.placeholder}>
          <Placeholder placeholder={"Правила отсутствуют"} />
        </div>
      )}
      <div className={classes.add_wrapper}>
        <Input disabled={addFirewallIsLoading} {...name} />
        <Input disabled={addFirewallIsLoading} {...dest_port} />
        <Input disabled={addFirewallIsLoading} {...src_dport} />
        <Input disabled={addFirewallIsLoading} {...dest_ip} />
        <Input disabled={addFirewallIsLoading} {...src_ip} />
      </div>
      <Button
        className={classes.btn_add}
        fullWidth
        onClick={async () => {
          addFirewall({
            module: "firewall",
            type: "redirect",
            params: {
              name: name.value,
              dest_ip: dest_ip.value,
              dest_port: dest_port.value,
              src_dport: src_dport.value,
              src_ip: src_ip.value,
            },
          });
        }}
        disabled={addBtnDisabled}
      >
        Добавить
      </Button>
    </TableContainer>
  );
}

type FirewallRowProps = {
  row: Rule;
  addFirewall: (dto: AddFirewallDTO) => Promise<void>;
  getFirewall: () => Promise<void>;
};
const FirewallRow: React.FC<FirewallRowProps> = ({
  row,
  addFirewall,
  getFirewall,
}) => {
  const classes = useStyles();
  const select = useSelect({
    items: [{ label: "Все", value: 0 }],
    selectedValue: 0,
    label: "IP",
  });
  const ip = useInput("", { label: "IP" });
  const name = useInput(row.name);
  const srcDport = useInput(row.src_dport);
  const destPort = useInput(row.dest_port);
  const modal = useModal();
  const [loading, setLoading] = React.useState<boolean>(false);

  const handleDeleteRule = async (rule: Rule) => {
    setLoading(true);
    const params = Object.entries(rule.src_neigh ?? {}).reduce(
      (acc: { [real_name: string]: string }, [realName, _]) => {
        acc[realName] = realName;
        return acc;
      },
      { [rule.real_name]: rule.real_name }
    );

    console.log({ params });
    const res = await cubicApi.setting.delFirewall({
      module: MODULE[0],
      type: TYPE[0],
      params,
    });
    console.log({ res });
    setLoading(false);
    await getFirewall();
  };

  async function setFirewall() {
    setLoading(true);
    const res = await cubicApi.setting.setFirewall({
      module: "firewall",
      params: {
        [row.real_name]: {
          name: name.value,
          src_dport: srcDport.value,
          dest_port: destPort.value,
        },
      },
    });
    setLoading(false);
    console.log(setFirewall, res);
  }

  const Chips = Object.entries(row.src_neigh ?? {})?.map(
    ([realName, el], index) => {
      const label = typeof el === "string" ? el : "*";
      return (
        <ChipFirwall
          key={index}
          label={label}
          getFirewall={getFirewall}
          row={row}
        />
      );
    }
  );

  return (
    <TableRow className={classes.firewall_row} key={row.name}>
      <TableCell component="th">
        {/* <div className={classes.cell_name}>{row.name}</div> */}
        <Input className={classes.input} {...name} disabled={loading} />
      </TableCell>
      <TableCell component="th">{row.device}</TableCell>
      <TableCell align="center">
        <Input className={classes.input} {...srcDport} disabled={loading} />
      </TableCell>
      <TableCell align="center">
        <Input className={classes.input} {...destPort} disabled={loading} />
      </TableCell>
      <TableCell align="center">
        <div className={classes.cell_chips}>
          {Chips.length > 0 ? (
            Chips
          ) : (
            <Chip className={classes.chip} variant="outlined" label={"Нету"} />
          )}
          <Chip
            className={classes.chip}
            variant="default"
            label={"Добавить"}
            onClick={modal.openModal}
            disabled={loading}
          />
          <div className={classes.actions}>
            {loading ? (
              <CircularProgress size={12} />
            ) : (
              <>
                <IconButton
                  onClick={async () => {
                    await setFirewall();
                  }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  onClick={async () => {
                    await handleDeleteRule(row);
                  }}
                >
                  <HighlightOffIcon />
                </IconButton>
              </>
            )}
          </div>
        </div>
      </TableCell>

      <Modal {...modal}>
        <Typography className={classes.ip}>
          Введите IP для прваила {row.name}
        </Typography>
        <Input defaultRadius {...ip} fullWidth />
        <Button
          className={classes.btn_add}
          fullWidth
          onClick={async () => {
            setLoading(true);
            modal.closeModal();
            ip.onChange();
            const dto: AddFirewallDTO = {
              module: "firewall",
              type: row.type,
              params: {
                name: row.name,
                dest_port: row.dest_port,
                src_dport: row.src_dport,
                src_ip: ip.value,
                dest_ip: row.dest_ip,
              },
            };
            await addFirewall(dto);
            await getFirewall();
            setLoading(false);
          }}
          disabled={loading}
        >
          Добавить
        </Button>
      </Modal>
    </TableRow>
  );
};

type ChipFirwallProps = {
  row: Rule;
  label: string;
  getFirewall: () => Promise<void>;
};
const ChipFirwall: React.FC<ChipFirwallProps> = ({
  row,
  label,
  getFirewall,
}) => {
  const classes = useStyles();
  const [loading, setLoading] = React.useState<boolean>(false);
  const handleDeleteChip = async (rule: Rule) => {
    setLoading(true);
    const res = await cubicApi.setting.delFirewall({
      module: MODULE[0],
      type: TYPE[0],
      params: {
        [rule.real_name]: rule.real_name,
      },
    });
    console.log({ res });
  };

  return (
    <Chip
      className={classes.chip}
      variant="outlined"
      label={label}
      onDelete={async () => {
        await handleDeleteChip(row);
        await getFirewall();
        setLoading(false);
      }}
      deleteIcon={loading ? <CircularProgress size={12} /> : undefined}
    />
  );
};

type AddFirewallModalProps = {
  addFirewall: (dto: AddFirewallDTO) => Promise<void>;
  getFirewall: () => Promise<void>;
};
const AddFirewallModal: React.FC<AddFirewallModalProps> = ({
  getFirewall,
  addFirewall,
}) => {
  const classes = useStyles();

  const { t } = useTranslation();

  const moduleSelect = useSelect({
    label: t("settings:module"),
    items: [{ label: "firewall", value: 0 }],
    selectedValue: 0,
  });
  const typeSelect = useSelect({
    label: t("settings:type"),
    items: [{ label: "redirect", value: 0 }],
    selectedValue: 0,
  });

  // items: Object.entries(TYPE).map((label, value) => {
  //   return { label, value };
  // }),

  // const module = useInput("", { label: t("settings:module") });
  // const type = useInput("", { label: t("settings:type") });
  const name = useInput("", { label: t("settings:name") });
  const dest = useInput("", { label: t("settings:dest") });
  const target = useInput("", { label: t("settings:target") });
  const proto = useInput("", { label: t("settings:proto") });
  const dest_port = useInput("", { label: t("settings:dest_port") });
  const src_dport = useInput("", { label: t("settings:src_dport") });
  const src = useInput("", { label: t("settings:src") });
  const src_ip = useInput("", { label: t("settings:src_ip") });

  return (
    <div className={classes.modal}>
      <Select className={classes.input_modal} {...moduleSelect} />
      <Select className={classes.input_modal} {...typeSelect} />
      <Input defaultRadius className={classes.input_modal} {...name} />
      <Input defaultRadius className={classes.input_modal} {...dest} />
      <Input defaultRadius className={classes.input_modal} {...target} />
      <Input defaultRadius className={classes.input_modal} {...proto} />
      <Input defaultRadius className={classes.input_modal} {...dest_port} />
      <Input defaultRadius className={classes.input_modal} {...src_dport} />
      <Input defaultRadius className={classes.input_modal} {...src} />
      <Input defaultRadius className={classes.input_modal} {...src_ip} />
      <Button
        className={classes.btn_add}
        fullWidth
        onClick={async () => {
          const dto: AddFirewallDTO = {
            module: MODULE[moduleSelect.value],
            type: TYPE[typeSelect.value],
            params: {
              name: name.value,
              dest_port: dest_port.value,
              src_dport: src_dport.value,
              src_ip: src_ip.value,
              dest_ip: src_ip.value,
            },
          };
          await addFirewall(dto);
          await getFirewall();
        }}
      >
        Добавить
      </Button>
    </div>
  );
};

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    actions: { position: "absolute", top: -15, right: -10 },
    select: { width: 300, textAlign: "start" },
    input: {
      width: 100,
    },
    btn_add: { marginTop: theme.spacing(3) },
    ip: { marginBottom: theme.spacing(2) },
    modal: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      gap: theme.spacing(2),
      maxWidth: 600,
    },
    input_modal: { width: "48%" },
    add_wrapper: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: theme.spacing(2),
      padding: theme.spacing(2, 2, 0),
    },
    firewall_row: {},
    firewall_cells: {},
    cell_chips: {
      position: "relative",
      display: "flex",
      flexGrow: 1,
      flexWrap: "wrap",
      justifyContent: "center",
      gap: theme.spacing(2),
    },
    chip: { width: 150 },
    cell_name: { display: "flex", alignItems: "center", gap: theme.spacing(1) },
    placeholder: { minWidth: "100%" },
    table_body: { display: "flex", flexGrow: 1 },
  })
);
