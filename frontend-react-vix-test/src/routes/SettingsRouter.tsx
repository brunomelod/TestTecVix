import { PrivatePage } from "../auth/PrivatePage";
import { SettingsPage } from "../pages/Settings";

export const SettingsRouter = {
  path: "/settings",
  element: (
    <PrivatePage>
      <SettingsPage />
    </PrivatePage>
  ),
};
