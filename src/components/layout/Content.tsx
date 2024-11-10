import { Layout } from 'antd';

const AntdContent = Layout.Content;

const contentStyle: React.CSSProperties = {
    textAlign: 'center',
    minHeight: 'calc(100vh - 64px)',
    color: '#fff',
    backgroundColor: '#001529',
    padding: '1rem'
  };

  export function Content() {
    return (<AntdContent style={contentStyle}>Content</AntdContent>);
}
