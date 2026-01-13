import "./index.scss";
import "./component/OrdersFolder/ordersPreviewComponent.scss";
import "./ToolTip.scss";

export default function ToolTip({
  children,
  toolTippDirection,
  toolTipPaddingTopBottom,
  toolTipPaddingLeftRight,
}: {
  children: React.ReactNode;
  toolTippDirection: string;
  toolTipPaddingTopBottom: number;
  toolTipPaddingLeftRight: number;
}) {
  return (
    <p
      style={{
        padding: `${toolTipPaddingTopBottom}rem ${toolTipPaddingLeftRight}rem`,
      }}
      className={`tool-tip-message ${toolTippDirection} user-feedback`}
    >
      {children}
    </p>
  );
}
