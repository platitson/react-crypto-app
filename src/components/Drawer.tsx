import { Drawer as AntdDrawer } from "antd";
import { AddAssetForm } from "./AddAssetForm";

type DrawerProps = {
  open: boolean;
  onClose: () => void;
};

export function Drawer(props: DrawerProps) {
  return (
    <AntdDrawer
      title="Add Asset"
      onClose={props.onClose}
      open={props.open}
      width={600}
      destroyOnClose
    >
      <AddAssetForm onClose={props.onClose} />
    </AntdDrawer>
  );
}
