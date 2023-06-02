import {Button, Form, Input, Col} from "antd";
import React, {createContext, useContext, useState} from "react";

const { TextArea } = Input;

const formItemLayout = {
	labelCol: { span: 2 },
	wrapperCol: { span: 22 },
};

const formTailLayout = {
	labelCol: { span: 2 },
	wrapperCol: { span: 8, offset: 20 },
};


// @ts-ignore
const GenContent = function ({formName, content}){
	if(content.helpText !== undefined) {
		return (<p>内容生成中...</p>);
	}
	if(formName === 'complainForm' && content.complain !== undefined) {
		const emr:Emr = content;
		return (
			<>
				<h1>病历记录</h1>
				<h2>主诉：</h2>
				<p>{emr.complain}</p>
				<h2>现病史：</h2>
				<p>{emr.PIH}</p>
				<h2>既往史：</h2>
				<p>{emr.PMH}</p>
				<h2>查体：</h2>
				<p>{emr.bodyCheck}</p>
				<h2>诊断：</h2>
				<p>{emr.diagnose}</p>
				<h2>处理意见：</h2>
				<p>{emr.suggest}</p>
			</>
		);
	} else if(formName === 'diagnoseForm' && content.drugs !== undefined){

		const rx:Rx = content;
		const drugItems = rx.drugs.map((drug: Drug, i:number) =>
			<tr key={i}>
				<td>{drug.drugName}</td>
				<td>{drug.spec}</td>
				<td>{drug.company}</td>
				<td>{drug.usage}</td>
				<td>{drug.days}</td>
				<td>{drug.quantity}</td>
				<td>{drug.notice}</td>
			</tr>);
		return (
			<>
				<h1>西药处方</h1>
				<table>
					<tbody>
					<tr>
						<th>药品名称</th>
						<th>规格</th>
						<th>厂家</th>
						<th>用法用量</th>
						<th>天数</th>
						<th>数量</th>
						<th>注意事项</th>
					</tr>
					{drugItems}
					</tbody>
				</table>
			</>
		);
	} else {
		return <></>;
	}
}

export const Completion = function (completionModel:CompletionModel){
	const [form] = Form.useForm();
	const [formEnable, setFormEnable] = useState(false);
	const [content, setContent] = useState({});
	const onReset = () => {
		form.resetFields();
	};
	const onFinish = (values:any) => {
		setFormEnable(true);
		setContent({'helpText':'内容生成中...'});
		fetch(completionModel.apiUrl+values['content'],{
			headers:{'Content-Type': 'application/json'},
			method: 'GET'
		}).then(response => {
			return response.json()
		}).then((data)=>{
			const message:string = data.message.replace("\\n","").replace("\\","");
			if(completionModel.formName == "diagnoseForm"){
				setContent(JSON.parse("{ \"\drugs\":"+message+"}"));
			} else {
				setContent(JSON.parse(message));
			}
			setFormEnable(false);
		});
	};
	// @ts-ignore
	return (
		<Col span={12}>
			<Form disabled={formEnable}
					 labelCol={{span: 4}}
					 wrapperCol={{span: 20}}
					 form={form}
					 onFinish={onFinish}
					 name={completionModel.formName}
					 layout="horizontal"
			>
			<Form.Item {...formItemLayout} name="content" label={completionModel.label}  rules={[{ required: true, message: '请输入'+ completionModel.label}]}>
				<TextArea rows={4} placeholder={'请输入'+completionModel.label+'...'}/>
			</Form.Item>
			<Form.Item {...formTailLayout}>
				<Button type="primary" htmlType="submit" style={{float:'right', marginLeft: 5}}>
					提交
				</Button>
				<Button htmlType="button" onClick={onReset} style={{float:'right'}}>
					重置
				</Button>
			</Form.Item>
			<Form.Item wrapperCol={{ span: 24 }} labelCol={{ span: 0 }}>
				<div className="gen-content">
					<GenContent formName={completionModel.formName} content={content}/>
				</div>
			</Form.Item>
		</Form>
	</Col>
	);
}

