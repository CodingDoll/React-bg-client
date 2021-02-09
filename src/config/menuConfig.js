import {
  HomeOutlined,
  ShoppingOutlined,
  AppstoreOutlined,
  PieChartOutlined,
  LineChartOutlined,
  BarChartOutlined,
  UserOutlined,
  TeamOutlined,
} from "@ant-design/icons";

export const menuList = [
  {
    title: "首页",
    key: "/home",
    icon: <HomeOutlined />,
  },
  {
    title: "商品",
    key: "/pruduct",
    icon: <AppstoreOutlined />,
    children: [
      {
        title: "商品管理",
        key: "/product",
        icon: <ShoppingOutlined />,
      },
      {
        title: "分类管理",
        key: "/category",
        icon: <AppstoreOutlined />,
      },
    ],
  },
  {
    title: "用户管理",
    key: "/user",
    icon: <UserOutlined />,
  },
  {
    title: "角色管理",
    key: "/role",
    icon: <TeamOutlined />,
  },
  {
    title: "图形图表",
    key: "/charts",
    icon: <HomeOutlined />,
    children: [
      {
        title: "饼图图表",
        key: "/charts/pie",
        icon: <PieChartOutlined />,
      },
      {
        title: "线形图表",
        key: "/charts/line",
        icon: <LineChartOutlined />,
      },
      {
        title: "柱形图表",
        key: "/charts/bar",
        icon: <BarChartOutlined />,
      },
    ],
  },
];
