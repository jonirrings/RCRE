import * as React from 'react';
import {BasicConfig, BasicContainer, BasicContainerPropsInterface} from '../../render/core/Container/types';
import {Modal} from 'antd';
import {createChild} from '../../render/util/createChild';
import {ModalProps} from 'antd/lib/modal/Modal';
import componentLoader from '../../render/util/componentLoader';

export class ModalConfig extends BasicConfig {
    /**
     * Modal的数据模型Key
     */
    name: string;

    /**
     * 确定按钮 loading
     */
    confirmLoading?: boolean;

    /**
     * 标题
     */
    title?: string;

    /**
     * 是否显示右上角的关闭按钮
     */
    closable?: boolean;

    /**
     * 宽度
     */
    width?: number | string;

    /**
     * 底部内容
     */
    footer?: BasicConfig[];

    /**
     * 确认按钮文字
     */
    okText?: string;

    /**
     * 确认按钮类型
     */
    okType?: 'primary' | 'ghost' | 'dashed' | 'danger' | undefined;

    /**
     * 取消文字
     */
    cancelText?: string;

    /**
     * 点击蒙层是否允许关闭
     */
    maskClosable?: boolean;

    /**
     * 对话框外层容器的类名
     */
    wrapClassName?: string;

    /**
     * 设置 Modal 的 z-index
     */
    zIndex?: number;

    /**
     * 字级内容
     */
    children: BasicConfig[];
}

export class ModalPropsInterface extends BasicContainerPropsInterface {
    info: ModalConfig;
}

export class AbstractModal extends BasicContainer<ModalPropsInterface, {}> {
    constructor() {
        super();

        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    handleOk() {
        if (this.props.$setData) {
            this.props.$setData(this.props.info.name, false);
        }

        this.commonEventHandler('onOk', {
            event: event
        });
    }

    handleCancel() {
        if (this.props.$setData) {
            this.props.$setData(this.props.info.name, false);
        }

        this.commonEventHandler('onCancel', {
            event: event
        });
    }
    
    private mapModalOptions(info: ModalConfig): ModalProps {
        return {
            confirmLoading: info.confirmLoading,
            title: info.title,
            closable: info.closable,
            width: info.width,
            okText: info.okText,
            okType: info.okType,
            cancelText: info.cancelText,
            maskClosable: info.maskClosable,
            wrapClassName: info.wrapClassName,
            zIndex: info.zIndex,
        };
    }

    render() {
        let info = this.getPropsInfo(this.props.info, this.props, ['children', 'footer']);

        if (!this.props.$data) {
            return this.errorReport('Modal Element is out of RCRE control, please put it inside container component',
                'div');
        }

        if (!info.name) {
            return this.errorReport('name property is required of modal component', 'div');
        }

        let visible = this.props.$data.get(info.name) || false;

        let footer = null;
        if (info.footer) {
            footer = info.footer.map((fo, index) => {
                return createChild(fo, this.getChildProps(fo, {
                    key: `${this.props.model}_footer_${index}`
                }));
            });
        }

        let modalProps = this.mapModalOptions(info);
        let children = info.children.map((child, index) => {
            return createChild(child, this.getChildProps(child, {
                key: `${this.props.model}_${index}`
            }));
        });

        modalProps.visible = visible;
        modalProps.onOk = this.handleOk;
        modalProps.onCancel = this.handleCancel;

        if (footer) {
            modalProps.footer = footer;
        }

        return (
            <Modal
                {...modalProps}
            >
                {children}
            </Modal>

        );
    }
}

componentLoader.addComponent('modal', AbstractModal, ModalPropsInterface);