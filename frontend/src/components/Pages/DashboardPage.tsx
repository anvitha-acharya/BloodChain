import React from "react";
import { Card } from "../UI/Card";

interface DashboardPageProps {
  title: string;
  description: string;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ title, description }) => (
  <Card>
    <h2 style={{ color: 'var(--primary)', marginBottom: 16 }}>{title}</h2>
    <p style={{ fontSize: 18 }}>{description}</p>
  </Card>
);