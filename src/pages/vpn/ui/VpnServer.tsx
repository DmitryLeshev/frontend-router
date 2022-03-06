import { Typography, Button } from "shared/ui/components";

import { cubicApi } from 'shared/api'
import { makeStyles, createStyles, CircularProgress } from "@material-ui/core";
import { ITheme } from "shared/ui/theme/theme";
import { useEffect, useRef, useState } from "react";
import { Card, Loader, Modal } from "shared/components";
import { useModal } from "shared/hooks";
import { useTranslation } from "react-i18next";
import { OpenVpnActionType } from "shared/api/cubic/setting";

const downloadFile = async () => {
    const res = await cubicApi.setting.openVPNGetCerts();
    console.log({ res });
    let element = document.createElement("a");
    let filename = "openvpn.tar.gz";
    element.setAttribute("href", "data:application/octet-stream;base64, " + res.data);
    element.setAttribute("download", filename);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
};

const VpnServer = () => {
    const classes = useStyles();
    const usemodal = useModal();
    const { t } = useTranslation();
    const [status, setStatus] = useState<"missing" | "process" | "generated" | null>(null);
    const [generatedStatus, setGeneratedStatus] = useState<"stopped" | "running" | null>(null);
    const [generatedStatusIsLoading, setGeneratedStatusIsLoading] = useState<boolean>(false);

    async function statusHandler() {
        const { data } = await cubicApi.setting.checkGenerate();
        data && setStatus(data)
    }

    async function statusRunningHandler() {
        const { data } = await cubicApi.setting.statusRunning({ type: 'server' });
        data && setGeneratedStatus(data);
    }

    async function setStateOpenVpnHandler(action: OpenVpnActionType) {
        await cubicApi.setting.setStateOpenVpn({ action });
        await statusRunningHandler();
    }

    useEffect(() => {
        statusHandler()
    }, [])

    useEffect(() => {
        if (status === 'generated') {
            statusRunningHandler()
        }
    }, [status])

    const header = <Typography variant="h5">{t("VPN Server")}</Typography>;

    const body = (
        <>
            <Typography variant="h6">Description</Typography>
            <Typography variant='body1' paragraph>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ex, facilis fuga aspernatur alias suscipit praesentium dolores labore est, ab earum ipsum consectetur placeat totam dolore magni, iste iusto voluptatibus minus.</Typography>

            {!status ? (
                <Loader />
            ) : (
                <div className={classes.btns}>

                    {status !== 'process' && <Button onClick={usemodal.openModal}>Генерировать ключи</Button>}
                    {status === 'generated' && (
                        <>
                            {generatedStatus === 'running' ? (
                                <Button onClick={() => setStateOpenVpnHandler('serverdisable')}>Остановить</Button>
                            ) : (
                                <Button onClick={() => setStateOpenVpnHandler('serverenable')}>Запустить</Button>
                            )}
                            <Button onClick={downloadFile}>Скачать Сертификат</Button>
                        </>
                    )}
                    {status === 'process' && (
                        <>
                            <Typography variant="h6">Ключи генерируются <CircularProgress size={14} /> </Typography>
                        </>
                    )}
                </div>
            )}
        </>
    );

    const modal = (
        <>
            <Typography variant="h4">{t("settings:are-you-sure")}</Typography>
            <Typography variant="h6">Description</Typography>
            <Typography variant='body1' paragraph>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ex, facilis fuga aspernatur alias suscipit praesentium dolores labore est, ab earum ipsum consectetur placeat totam dolore magni, iste iusto voluptatibus minus.</Typography>

            <div className={classes.actions}>
                <Button
                    color="primary"
                    onClick={async () => {
                        usemodal.closeModal();
                        await cubicApi.setting.generateKeys();
                        await statusHandler();
                    }}
                    fullWidth
                >
                    {t("settings:yes")}
                </Button>
                <Button color="primary" onClick={usemodal.closeModal} fullWidth>
                    {t("settings:no")}
                </Button>

            </div>
        </>
    );

    return (
        <>
            <Card
                className={classes.card}
                header={header}
                body={body}
                footerProps={{ className: classes.footer }}
            />
            <Modal className={classes.modal} {...usemodal} children={modal} />
        </>
    )
}

const useStyles = makeStyles((theme: ITheme) =>
    createStyles({
        btns: { display: 'flex', gap: theme.spacing(2) },
        file: {
            display: "none",
        },
        card: {},
        footer: { alignItems: "center", justifyContent: "center" },
        btn: { borderRadius: theme.spacing(3), width: 360 },
        actions: {
            display: "flex",
            marginTop: theme.spacing(2),
            gap: theme.spacing(4),
            "& > button:last-child": { marginLeft: theme.spacing(2) },
        },
        field: { marginBottom: theme.spacing(2) },
        modal: { width: 400 }
    })
);

export default VpnServer