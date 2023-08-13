import { Space, Spin } from "antd";

const PageLoader = () => {
	return (
		<Space
			direction="vertical"
			style={{
				width: "100%",
				height: "100%",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<Space>
				<Spin tip="Loading" size="large">
					<div className="content" />
				</Spin>
			</Space>
		</Space>
	);
};

export default PageLoader;
