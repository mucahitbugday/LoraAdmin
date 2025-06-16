import React from 'react';

interface StatisticsCardProps {
    title: string;
    value: string;
    change: string;
    isPositive: boolean;
    icon: React.ReactNode;
}

const StatisticsCard: React.FC<StatisticsCardProps> = ({
    title,
    value,
    change,
    isPositive,
    icon
}) => {
    return (
        <div className="card">
            <div className="card-body">
                <div className="row">
                    <div className="col mt-0">
                        <h5 className="card-title">{title}</h5>
                    </div>
                    <div className="col-auto">
                        <div className="stat text-primary">
                            {icon}
                        </div>
                    </div>
                </div>
                <h1 className="mt-1 mb-3">{value}</h1>
                <div className="mb-0">
                    <span className={`badge ${isPositive ? 'badge-success-light' : 'badge-danger-light'}`}>
                        {change}
                    </span>
                    <span className="text-muted"> Since last week</span>
                </div>
            </div>
        </div>
    );
};

export default StatisticsCard; 