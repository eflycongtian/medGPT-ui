import React from 'react';
import type { FC } from 'react';
import {API} from './api';
import {
	ConfigProvider,
	Row,
	Layout,
} from 'antd';
import 'antd/dist/reset.css';
import './App.css';
import {Completion} from "./components/Completion";

const { Header, Content } = Layout;


const ThemeConfig = () => (
	<ConfigProvider
		theme={{
			token: {
				colorPrimary: '#00b96b',
			},
		}}
	>
		<App />
	</ConfigProvider>
);
export default ThemeConfig;

const App: FC = () => {
	return (<Layout className="layout">
			<Header style={{display: 'flex', alignItems: 'center'}}>
				<h1 style={{color: '#FFF'}}>OpenAI ChatGPT 医生接诊助手</h1>
			</Header>
			<Content className="stie-layout" style={{padding: '30px 30px'}}>
				<div className="site-layout-content" style={{ padding: 24, minHeight: 660,background:'#FFF' }}>
					<Row>
						<Completion key="complain" label="主诉" formName="complainForm" apiUrl={API.EmrAPI} />
						<Completion key="diagnose" label="诊断" formName="diagnoseForm" apiUrl={API.RxAPI} />
					</Row>
				</div>
			</Content>
	</Layout>);
}


