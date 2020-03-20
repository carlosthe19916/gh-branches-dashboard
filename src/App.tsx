import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./Routes";
import { HorizontalLayout } from "./PresentationalComponents/Layout/HorizontaLayout";

import "./App.css";
import "./App.scss";

import DeleteMessageDialog from "./SmartComponents/DeleteDialog";

import "@redhat-cloud-services/frontend-components-notifications/index.css";
import "@redhat-cloud-services/frontend-components-notifications/index.css";
const frontendComponentsNotifications = require("@redhat-cloud-services/frontend-components-notifications");

const App: React.FC = () => {
  const NotificationsPortal =
    frontendComponentsNotifications.NotificationsPortal;

  return (
    <React.Fragment>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <HorizontalLayout>
          <AppRoutes />
          <DeleteMessageDialog />
          <NotificationsPortal />
        </HorizontalLayout>
      </BrowserRouter>
    </React.Fragment>
  );
};

export default App;
