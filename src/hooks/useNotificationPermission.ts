import { useEffect, useState } from "react";
import {
    isPermissionGranted,
    requestPermission,
} from "@tauri-apps/plugin-notification";

export function useNotificationPermission() {
    const [permissionGranted, setPermissionGranted] = useState<boolean>(false);

    useEffect(() => {
        const checkPermission = async () => {
            const granted = await isPermissionGranted();
            if (!granted) {
                const permission = await requestPermission();
                setPermissionGranted(permission === "granted");
            } else {
                setPermissionGranted(true);
            }
        };
        checkPermission();
    }, []);

    return permissionGranted;
}
