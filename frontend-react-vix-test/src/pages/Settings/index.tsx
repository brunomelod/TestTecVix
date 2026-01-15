import { Screen } from "../../components/Screen";
import { Stack, Tabs, Tab, Box } from "@mui/material";
import { useState } from "react";
import { useZTheme } from "../../stores/useZTheme";
import { useTranslation } from "react-i18next";
import { TextRob20Font1MB } from "../../components/Text1MB";
import { PersonalInfoTab } from "./components/PersonalInfoTab";
import { SecurityTab } from "./components/SecurityTab";
import { ProfileImageTab } from "./components/ProfileImageTab";

export const SettingsPage = () => {
  const { theme, mode } = useZTheme();
  const { t } = useTranslation();
  const [currentTab, setCurrentTab] = useState(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  return (
    <Screen
      sx={{
        overflowY: "auto",
        padding: "40px",
      }}
    >
      <Stack spacing={3} sx={{ maxWidth: "900px", width: "100%" }}>
        {/* Título */}
        <TextRob20Font1MB
          sx={{
            color: theme[mode].primary,
            fontSize: "28px",
            fontWeight: "500",
            lineHeight: "40px",
          }}
        >
          {t("settings.title") || "Configurações"}
        </TextRob20Font1MB>

        {/* Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: theme[mode].grayLight }}>
          <Tabs
            value={currentTab}
            onChange={handleTabChange}
            sx={{
              "& .MuiTab-root": {
                color: theme[mode].gray,
                textTransform: "none",
                fontSize: "16px",
              },
              "& .Mui-selected": {
                color: theme[mode].blue + " !important",
              },
              "& .MuiTabs-indicator": {
                backgroundColor: theme[mode].blue,
              },
            }}
          >
            <Tab label={t("settings.personalInfo") || "Informações Pessoais"} />
            <Tab label={t("settings.security") || "Segurança"} />
            <Tab label={t("settings.profileImage") || "Foto de Perfil"} />
          </Tabs>
        </Box>

        {/* Conteúdo das Tabs */}
        <Box sx={{ py: 3 }}>
          {currentTab === 0 && <PersonalInfoTab />}
          {currentTab === 1 && <SecurityTab />}
          {currentTab === 2 && <ProfileImageTab />}
        </Box>
      </Stack>
    </Screen>
  );
};
