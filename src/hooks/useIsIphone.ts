import { useEffect, useState } from "react";

export function useIsIphone(): boolean {
  const [isIphone, setIsIphone] = useState(false);

  useEffect(() => {
    if (typeof navigator !== "undefined") {
      const ua = navigator.userAgent || navigator.vendor || "";
      const isiOS = /iPhone|iPod/.test(ua);
      setIsIphone(isiOS);
    }
  }, []);

  return isIphone;
}
