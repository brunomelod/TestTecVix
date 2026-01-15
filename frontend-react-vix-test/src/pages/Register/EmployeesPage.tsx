import { ScreenFullPage } from "../../components/ScreenFullPage";
import { TextRob20Font1MB } from "../../components/Text1MB";
import { useZTheme } from "../../stores/useZTheme";
import { useTranslation } from "react-i18next";
import { UnderConstruction } from "../../components/UnderConstruction";

/**
 * Página de cadastro e gerenciamento de funcionários.
 * TODO: Implementar formulário de cadastro e listagem de funcionários
 * usando a API /auth/register para criar novos usuários com role "member" ou "manager"
 */
export const EmployeesPage = () => {
  const { theme, mode } = useZTheme();
  const { t } = useTranslation();

  return (
    <ScreenFullPage
      title={
        <TextRob20Font1MB
          sx={{
            color: theme[mode].primary,
            fontSize: "28px",
            fontWeight: "500",
            lineHeight: "40px",
          }}
        >
          {t("sidebar.colaboratorRegister")}
        </TextRob20Font1MB>
      }
      sxTitleSubTitle={{
        paddingLeft: "40px",
        paddingRight: "40px",
      }}
      sxContainer={{
        paddingLeft: "40px",
        paddingRight: "40px",
        paddingBottom: "40px",
      }}
    >
      <UnderConstruction />
    </ScreenFullPage>
  );
};
