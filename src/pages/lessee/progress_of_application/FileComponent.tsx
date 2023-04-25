import { FileExcelOutlined, FilePdfOutlined, FileWordOutlined } from "@ant-design/icons";

// 定义文件组件，显示文件的名称和图标
export const FileComponent = (props: { name: string }) => {
  const { name } = props; // 获取文件名称
  const ext = name.split('.').pop(); // 获取文件扩展名
  let icon; // 定义文件图标
  switch (ext) {
    case 'pdf':
      icon = <FilePdfOutlined />; // PDF图标
      break;
    case 'docx':
      icon = <FileWordOutlined />; // PDF图标
      break;
    case 'xlsx':
      icon = <FileExcelOutlined />; // Excel图标
      break;
    default:
      icon = null;
  }
  return (
    <a href={'files/'+name}>
      {icon} {name}
    </a>
  );
};