import * as React from 'react';
import {BasicConfig, BasicContainer, BasicContainerPropsInterface} from '../../render/core/Container/types';
import {Tabs} from 'antd';
import {TabsProps} from 'antd/lib/tabs';
import {createChild} from '../../render/util/createChild';
import componentLoader from '../../render/util/componentLoader';

const TabPane = Tabs.TabPane;

export class TabItem {
    /**
     * Tab 标签标题
     */
    title: string;

    /**
     * 标签页内容
     */
    children: BasicConfig[];
}

export class TabsConfig extends BasicConfig {
    /**
     * Tabs数据模型的Key
     */
    name: string;
    
    /**
     * 当前激活 tab 面板的 key
     */
    activeKey: string;

    /**
     * 是否使用动画切换 Tabs，在 tabPosition=top|bottom 时有效
     */
    animated: boolean;

    /**
     * 大小，提供 default 和 small 两种大小，仅当 antd.type="line" 时生效。
     */
    size: 'default' | 'small';

    /**
     * tab bar 的样式对象
     */
    tabBarStyle: React.CSSProperties;

    /**
     * 页签位置，可选值有 top right bottom left
     */
    tabPosition: 'left' | 'top' | 'bottom' | 'left';

    /**
     * 标签页列表
     */
    tabs: TabItem[];

    /**
     * 页签的基本样式，可选 line、card editable-card 类型
     */
    'antd.type': 'line' | 'card';
}

export class TabsPropsInterface extends BasicContainerPropsInterface {
    /**
     * 组件配置
     */
    info: TabsConfig;
}

export class AbstractTabs extends BasicContainer<TabsPropsInterface, {}> {
    constructor() {
        super();
    }

    private mapTabsOptions(info: TabsConfig): TabsProps {
        return {
            tabBarStyle: info.tabBarStyle,
            type: info['antd.type'],
            tabPosition: info.tabPosition,
            size: info.size,
            style: info.style,
            className: info.className,
            animated: info.animated
        };
    }

    render() {
        let info = this.getPropsInfo(this.props.info);
        let tabsOptions = this.mapTabsOptions(info);
        let underContainerControl = !!this.props.$data;

        let tabs = info.tabs;

        if (!(tabs instanceof Array)) {
            return <div>Tabs property should be array</div>;
        } else if (tabs.length === 0) {
            return <Tabs />;
        }

        let tabElements = tabs.map((tab) => {
            let title = tab.title;
            let children = tab.children;
            let childElements = null;

            if (!(children instanceof Array)) {
                childElements = createChild(children, this.getChildProps(info, `tab_${title}`));
            } else {
                childElements = children.map((child, index) =>
                    createChild(child, this.getChildProps(child, `tab_${title}_${index}`))
                );
            }

            return (
                <TabPane tab={title} key={title}>
                    {childElements}
                </TabPane>
            );
        });

        let tabsProps: TabsProps = {
            ...tabsOptions,
            defaultActiveKey: !underContainerControl ? tabs[0].title : '',
            onChange: (activeKey => {
                if (this.props.$setData) {
                    this.props.$setData(info.name, activeKey);
                }
            }),
            onEdit: ((targetKey, action) => {
                this.commonEventHandler('onEdit', {
                    targetKey: targetKey,
                    action: action
                });
            }),
            onTabClick: () => {
                this.commonEventHandler('onTabClick', []);
            }
        };
        
        if (this.props.$data) {
            tabsProps.activeKey = this.props.$data.get(info.name) || tabs[0].title;
        }
        
        return React.createElement(Tabs, tabsProps, tabElements);
    }
}

componentLoader.addComponent('tabs', AbstractTabs, TabsPropsInterface);