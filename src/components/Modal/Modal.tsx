import * as React from 'react';
import {BasicConfig, BasicContainer, BasicContainerPropsInterface} from '../../render/core/Container/types';
import {Modal} from 'antd';
import {createChild} from '../../render/util/createChild';
import {ModalProps} from 'antd/lib/modal/Modal';
import componentLoader from '../../render/util/componentLoader';

export class ModalConfig extends BasicConfig {
    /**
     * 对话框是否可见
     */
    visible?: boolean;

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
    }

    private mapModalOptions(info: ModalConfig): ModalProps {
        return {
            visible: info.visible,
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
            return <div>Modal Element is out of RCRE control, please put it inside container component</div>;
        }

        let footer = null;
        if (info.footer) {
            footer = info.footer.map((fo, index) => {
                return createChild(fo, this.getChildProps(fo, `${this.props.model}_footer_${index}`));
            });
        }

        let modalProps = this.mapModalOptions(info);
        let children = info.children.map((child, index) => {
            return createChild(child, this.getChildProps(child, `${this.props.model}_${index}`));
        });

        modalProps.visible = info.visible;
        modalProps.onOk = (event: React.MouseEvent<HTMLDivElement>) => {
            this.commonEventHandler('onOk', {
                event: event
            });
        };
        modalProps.onCancel = (event: React.MouseEvent<HTMLDivElement>) => {
            this.commonEventHandler('onCancel', {
                event: event
            });
        };

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