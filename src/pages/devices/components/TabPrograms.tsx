import { memo, useState } from "react";
import { Loader, Placeholder, Table } from "shared/components";
import { ScrollableContentiner } from "shared/ui/components";
import { createStyles, makeStyles } from "@material-ui/core";
import { ITheme } from "shared/ui/theme/theme";
import { useTranslation } from "react-i18next";
import { modelDevices } from "entities/device";

interface Props {}

export default memo(function TabPrograms({}: Props) {
  const [data, setData] = useState();
  const { t } = useTranslation();
  const device = modelDevices.selectors.useDevice();
  const isLoading = modelDevices.selectors.useProgramsLoading();

  console.log({ device, isLoading });

  const classes = useStyles();
  return (
    <div className={classes.tab}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {device.programs.length < 1 ? (
            <Placeholder placeholder={"Программы отсутствуют"} />
          ) : (
            <ScrollableContentiner>
              <Table
                columns={[
                  {
                    field: "name",
                    headerName: t("devices:device_programs.program"),
                    width: "20%",
                    base64: "icon",
                  },
                  {
                    field: "version",
                    headerName: t("devices:device_programs.version"),
                    width: "20%",
                  },
                  {
                    field: "location",
                    headerName: t("devices:device_programs.path"),
                    width: "20%",
                  },
                  {
                    field: "publisher",
                    headerName: t("devices:device_programs.vendor"),
                    width: "20%",
                  },
                  {
                    field: "instTst",
                    headerName: t("devices:device_programs.date"),
                    width: "20%",
                  },
                ]}
                rows={device.programs ?? []}
                sticky
              />
            </ScrollableContentiner>
          )}
        </>
      )}
    </div>
  );
});

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    tab: {
      display: "flex",
      flexDirection: "column",
      flexGrow: 1,
      height: 0,
      padding: theme.spacing(1.5, 2, 0),
    },
  })
);
