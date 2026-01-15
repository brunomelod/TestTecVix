import { useState, useEffect } from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
  Area,
  AreaChart, // Para as linhas de threshold
} from "recharts";
import { Stack, Typography } from "@mui/material";
import { useZTheme } from "../../../../stores/useZTheme";
import { useTranslation } from "react-i18next";
import { useZGlobalVar } from "../../../../stores/useZGlobalVar";
import { IFormatData } from "../../../../types/socketType";

export const MainGraphic = () => {
  const [chartData, setChartData] = useState<IFormatData[]>([]);
  const { theme, mode } = useZTheme();
  const { t } = useTranslation();

  // Mock de dados: gera valores aleatórios simulando uso de CPU
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const time = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      const randomValue = Math.random() * 100; // Valor aleatório entre 0 e 100
      
      setChartData((prev) => {
        const newData = [...prev, { time, value: randomValue }];
        // Mantém apenas os últimos 20 pontos
        return newData.slice(-20);
      });
    }, 2000); // Atualiza a cada 2 segundos

    return () => clearInterval(interval);
  }, []);

  const lastCpuUsage = chartData[chartData.length - 1]?.value || 0;

  const valueColor =
    lastCpuUsage < 70
      ? theme[mode].ok
      : lastCpuUsage < 90
        ? theme[mode].warning
        : theme[mode].danger;

  const { currentVMName: vmName } = useZGlobalVar();

  // if (!chartData.length) return <EmptyFeedBack />;

  return (
    <Stack
      sx={{
        width: "100%",
        height: "100%",
      }}
    >
      <Typography
        sx={{
          padding: "2px",
          color: theme[mode].primary,
          fontWeight: "500",
          paddingRight: "24px",
        }}
      >
        {`${t("graphics.cpuUsage")} - ${vmName}`}
        <span style={{ color: theme[mode].gray, fontWeight: "300" }}>
          {" "}
          {t("graphics.currentUse")}{" "}
          <span style={{ color: valueColor }}>{lastCpuUsage.toFixed(3)}%</span>
        </span>
      </Typography>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 0, bottom: 20 }} // Aumentando o espaço superior e inferior
        >
          <CartesianGrid strokeDasharray="3 3" stroke={theme[mode].gray} />
          <XAxis
            dataKey="time"
            label={{
              value: t("graphics.time"),
              position: "insideBottomRight",
              offset: -5,
              fill: theme[mode].dark, // Cor branca
              fontSize: 10, // Fonte menor
            }}
            tick={{ fill: theme[mode].dark, fontSize: 10 }} // Ticks do eixo X em branco e menores
          />
          <YAxis
            label={{
              value: t("graphics.cpuUsage"),
              angle: -90,
              position: "insideLeft",
              fill: theme[mode].dark,
              fontSize: 10,
            }}
            tick={{ fill: theme[mode].dark, fontSize: 10 }}
            domain={[0, (dataMax: number) => Math.ceil(dataMax * 1.16)]} // Adicionando margem acima do maior valor
          />
          <Tooltip
            formatter={(value) => parseFloat(value as string).toFixed(2)} // Formata para 2 casas decimais
          />
          <Legend />
          <ReferenceLine
            y={70} // Linha amarela de threshold (uso alto acima de 70%)
            stroke="yellow"
            strokeDasharray="3 3"
          />
          <ReferenceLine
            y={90} // Linha vermelha de threshold  (uso critico acima de 90%)
            stroke="red"
            strokeDasharray="3 3"
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#8884d8"
            fill="#8884d8"
            dot={false}
            isAnimationActive={false}
            legendType="none" // retira legenda
            // name="CPU Usage (%)" // renomeia a legenda
          />
        </AreaChart>
      </ResponsiveContainer>
    </Stack>
  );
};
