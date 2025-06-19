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
        let className = 'card';
        if (variant === 'vertical') {
            className += ' d-flex flex-row';
        }
        return className;
    };

    const getNavClass = () => {
        let className = 'nav nav-tabs';
        if (variant === 'vertical') {
            className += ' flex-column nav-pills me-3';
        }
        if (type === 'primary') {
            className += ' nav-fill';
        }
        return className;
    };

    const renderTabHeader = (tab: Tab, index: number) => {
        const isIcon = type === 'icon' || type === 'colored-icon';
        const iconColor = type === 'colored-icon' ? 'text-danger' : '';

        return isIcon ? (
            <i className={`feather icon-home ${iconColor}`}></i>
        ) : (
            tab.title
        );
    };

    return (
        <div className={getTabClass()}>
            <ul className={getNavClass()} role="tablist">
                {tabs.map((tab, index) => (
                    <li key={tab.id} className="nav-item" role="presentation">
                        <a
                            className={`nav-link ${index === 0 ? 'active' : ''}`}
                            id={`tab-${tab.id}`}
                            data-bs-toggle="tab"
                            href={`#${tab.id}`}
                            role="tab"
                            aria-controls={tab.id}
                            aria-selected={index === 0}
                        >
                            {renderTabHeader(tab, index)}
                        </a>
                    </li>
                ))}
            </ul>

            <div className="tab-content flex-fill p-3 border-top border-start border-end">
                {tabs.map((tab, index) => (
                    <div
                        key={tab.id}
                        className={`tab-pane fade ${index === 0 ? 'show active' : ''}`}
                        id={tab.id}
                        role="tabpanel"
                        aria-labelledby={`tab-${tab.id}`}
                    >
                        {tab.content}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TabCard;
