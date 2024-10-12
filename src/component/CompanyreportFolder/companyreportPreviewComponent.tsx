import { useContext, useEffect, useState } from "react";
import { companyreportContext } from "./companyreportContext";
import Chart from "react-apexcharts";
import "./companyreportPreviewComponent.scss";

interface StateDatatype {
  options: OptionsDatatype;
  series: SeriesDataype[];
}

interface OptionsDatatype {
  chart: ChartDatatype;
  xaxis: AxisDatatype;
  colors: string[];
}

interface ChartDatatype {
  id: string;
}

interface AxisDatatype {
  categories: string[];
}

interface SeriesDataype {
  name: string;
  data: number[];
}

export default function CompanyreportPreviewComponent({
  reactChart,
}: {
  reactChart: StateDatatype;
}) {
  const { companyreportStorageObject } = useContext(companyreportContext);
  const [totalYearBilanz, setTotalYearBilanz] = useState<boolean>(false);
  const [monthSum, setMonthSum] = useState<boolean>(false);
  const totalYearSum: number = companyreportStorageObject.Umsatz || 0;
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    showMonthBilanz();
  }, []);

  function showTotalYearBilanz() {
    setTotalYearBilanz(true);
    setMonthSum(false);
  }

  function showMonthBilanz() {
    setTotalYearBilanz(false);
    setMonthSum(true);
  }

  return (
    <section className="companyreport-preview-section">
      <div className="companyreport-preview-section__button-div">
        {" "}
        <button
          onClick={showTotalYearBilanz}
          className="companyreport-preview-section__button-div--button button"
        >
          Umsatz {currentYear}
        </button>
        <button
          onClick={showMonthBilanz}
          className="companyreport-preview-section__button-div--button button"
        >
          Jahresbilanz
        </button>
      </div>

      {totalYearBilanz && (
        <div>
          <table className="companyreport-preview-section__table">
            <tr className="companyreport-preview-section__table--tr">
              <th className="companyreport-preview-section__table--tr--th">
                Umsatz {currentYear}
              </th>
            </tr>
            <tr className="companyreport-preview-section__table--tr">
              <td className="companyreport-preview-section__table--tr--td">
                {totalYearSum || "-"} €
              </td>
            </tr>
          </table>
        </div>
      )}

      {monthSum && (
        <div className="companyreport-preview-section__month-sum-div">
          {" "}
          <h2 className="companyreport-preview-section__month-sum-div--headline">
            Jahresbilanz
          </h2>
          <Chart
            options={reactChart.options}
            series={reactChart.series}
            type="area"
            className="companyreport-preview-section__month-sum-div--chart"
          />
        </div>
      )}
    </section>
  );
}
