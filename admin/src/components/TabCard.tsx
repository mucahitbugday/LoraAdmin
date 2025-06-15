import React from 'react';

interface Tab {
    id: string;
    title: string;
    content: React.ReactNode;
}

interface TabCardProps {
    type: 'default' | 'primary' | 'icon' | 'colored-icon';
    variant?: 'horizontal' | 'vertical';
    tabs: Tab[];
}

const TabCard: React.FC<TabCardProps> = ({ type, variant = 'horizontal', tabs }) => {
    const getTabClass = () => {
        let className = 'tab';
        if (type === 'primary') className += ' tab-primary';
        if (variant === 'vertical') className += ' tab-vertical';
        if (type === 'colored-icon' && variant === 'vertical') className += ' tab-danger';
        return className;
    };

    const renderTabHeader = (tab: Tab, index: number) => {
        const isIcon = type === 'icon' || type === 'colored-icon';

        if (isIcon) {
            return (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-home align-middle">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
            );
        }

        return tab.title;
    };

    return (
        <div className={getTabClass()}>
            <ul className="nav nav-tabs" role="tablist">
                {tabs.map((tab, index) => (
                    <li key={tab.id} className="nav-item" role="presentation">
                        <a
                            className={`nav-link  ${index === 0 ? 'active border border-bottom-0' : ''}`}
                            href={`#${tab.id}`}
                            data-bs-toggle="tab"
                            role="tab"
                            aria-selected={index === 0}
                        >
                            {renderTabHeader(tab, index)}
                        </a>
                    </li>
                ))}
            </ul>
            <div className="tab-content border">
                {tabs.map((tab, index) => (
                    <div
                        key={tab.id}
                        className={`tab-pane ${index === 0 ? 'active' : ''}`}
                        id={tab.id}
                        role="tabpanel"
                    >
                        {tab.content}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TabCard; 