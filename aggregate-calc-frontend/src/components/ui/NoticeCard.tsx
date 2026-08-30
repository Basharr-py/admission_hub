import Card from "./Card";
import "./NoticeCard.css";

type Props = {
  title: string;
  message: string;
};

function NoticeCard({
  title,
  message,
}: Props) {
  return (
    <Card title={title}>
      <div className="notice-card">
        <p>{message}</p>
      </div>
    </Card>
  );
}

export default NoticeCard;