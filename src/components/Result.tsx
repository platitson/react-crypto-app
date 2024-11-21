import { Button, Result as AntdResult } from "antd";

type ResultProps = {
  amount: number;
  price: number;
  name: string;
  onClose?: () => void;
};

export function Result(props: ResultProps) {
  return (
    <AntdResult
      status="success"
      title="New asset added successfully!"
      subTitle={`Added ${props.amount} of ${props.name} by price ${props.price}`}
      extra={[
        props.onClose && (
          <Button type="primary" key="console" onClick={props.onClose}>
            Close
          </Button>
        ),
      ]}
    />
  );
}
