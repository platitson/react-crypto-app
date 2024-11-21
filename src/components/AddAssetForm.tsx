import { useRef, useState } from "react";
import { CryptoSelect } from "./CryptoSelect";
import { useCrypto } from "../context/cryptoContext";
import { Asset, Crypto } from "../services/types";
import { Form, FormProps, InputNumber, Button, DatePicker } from "antd";
import { Result } from "./Result";
import { CoinInfoHeader } from "./CoinInfoHeader";

const validateMessages = {
  required: "${label} is required!",
  types: {
    number: "${label} is not valid number",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
    min: "${label} must be minimum ${min}",
  },
};

type AddAssetFormProps = {
  onClose?: () => void;
};

type FieldType = {
  amount: number;
  price: number;
  total: number;
  dateTime: any;
};

export function AddAssetForm(props: AddAssetFormProps) {
  const [form] = Form.useForm();
  const { crypto, addAsset } = useCrypto();
  const [coin, setCoin] = useState<Crypto>();
  const [submitted, setSubmitted] = useState<boolean>(false);

  const assetRef = useRef<Asset>();

  if (submitted) {
    if (!assetRef.current || !coin) return;
    return (
      <Result
        amount={assetRef.current.amount}
        price={assetRef.current.price}
        name={coin.name ?? coin.id}
        onClose={props.onClose}
      />
    );
  }

  const handleSelect = (value: string) => {
    setCoin(crypto.find((c) => c.id === value));
  };

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    const newAsset: Asset = {
      id: coin?.id ?? "", // TODO
      amount: values.amount,
      price: values.price,
      date: values.dateTime?.$d ?? new Date(),
    };
    assetRef.current = newAsset;
    addAsset && addAsset(newAsset);
    setSubmitted(true);
  };

  const handleAmountChange = (value: number | null) => {
    if (!value) return;
    const price = form.getFieldValue("price");
    coin &&
      form.setFieldsValue({
        total: +(value * price).toFixed(2),
      });
  };

  const handlePriceChange = (value: number | null) => {
    if (!value) return;
    const amount = form.getFieldValue("amount");
    coin &&
      form.setFieldsValue({
        total: +(amount * value).toFixed(2),
      });
  };

  if (!coin) {
    return (
      <CryptoSelect
        onSelect={handleSelect}
        placeholder="Select coin"
        style={{ width: "100%" }}
      />
    );
  }

  return (
    <>
      <CoinInfoHeader coin={coin} />
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 10 }}
        style={{ maxWidth: 600 }}
        initialValues={{
          amount: 0,
          price: +coin.price.toFixed(2),
        }}
        onFinish={onFinish}
        validateMessages={validateMessages}
      >
        <Form.Item<FieldType["amount"]>
          label="Amount"
          name="amount"
          rules={[
            {
              required: true,
              type: "number",
              min: 0,
            },
          ]}
        >
          <InputNumber
            placeholder="Enter coin amount"
            onChange={handleAmountChange}
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item<FieldType> label="Price" name="price">
          <InputNumber onChange={handlePriceChange} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item<FieldType> label="Date & Time" name="dateTime">
          <DatePicker showTime style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item<FieldType> label="Total" name="total">
          <InputNumber disabled style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit">
            Add Asset
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
