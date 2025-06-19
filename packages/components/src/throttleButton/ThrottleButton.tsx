import { Button, type GetProps } from "antd";
import type React from "react";
import { useEffect, useRef, useState } from "react";

type AfThrottleButtonProps = GetProps<typeof Button> & {
  throttleTime?: number;
  onClick: (e: React.MouseEventHandler<HTMLElement>) => Promise<boolean>;
};

export const AfThrottleButton: React.FC<AfThrottleButtonProps> = ({
  children,
  throttleTime = 60,
  onClick,
  ...props
}) => {
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(throttleTime);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  async function handleBtnClick(e: React.MouseEvent<HTMLElement, MouseEvent>) {
    setLoading(true);
    const next = (await onClick?.(e)) ?? true;
    setLoading(false);
    if (next) {
      setDisabled(true);
    }
  }

  useEffect(() => {
    if (disabled && countdown > 0) {
      timerRef.current = setInterval(() => {
        setCountdown((pre) => pre - 1);
      }, 1000);
    } else if (countdown === 0) {
      setDisabled(false);
      setCountdown(throttleTime);
    }
    return () => {
      timerRef.current && clearInterval(timerRef.current);
    };
  }, [countdown, disabled, throttleTime]);

  return (
    <Button
      {...props}
      disabled={disabled}
      loading={loading}
      onClick={handleBtnClick}
      style={{ minWidth: "60px" }}
    >
      {disabled ? `${countdown}s` : children}
    </Button>
  );
};

export default AfThrottleButton;
