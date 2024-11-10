import { Layout } from 'antd';

const AntdHeader = Layout.Header;

const headerStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#fff',
    height: 64,
    paddingInline: 48,
    lineHeight: '64px',
    backgroundColor: '#4096ff',
};

export function Header() {
    return (<AntdHeader style={headerStyle}>Header</AntdHeader>);
}