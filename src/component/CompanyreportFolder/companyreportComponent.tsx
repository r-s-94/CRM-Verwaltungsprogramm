import { useEffect, useState } from "react";
import { supabase } from "../../supabase";
import { Tables } from "../../database.types";
//import CompanyreportPreviewComponent from "./companyreportPreviewComponent";
//import { companyreportContext } from "./companyreportContext";
import Chart from "react-apexcharts";
import "../../index.scss";
import "./companyreport.scss";

export default function CompanyreportComponent() {
  const [companyreportStorageObject, setCompanyreportStorageObject] = useState<
    Tables<"Companyreport">
  >({ id: 0, salesVolume: 0 });

  interface ReactChartDatatype {
    options: OptionsDatatype;
    series: SeriesDatatype[];
  }

  interface OptionsDatatype {
    chart: Chart;
    xaxis: AxisDatatype;
    /*yaxis: YaxisDatatype;*/
    dataLabels: DataLabels;
    colors: string[];
  }

  interface Chart {
    id: string;
  }

  interface AxisDatatype {
    categories: string[];
  }

  /*interface YaxisDatatype {
    labels: LabelsDatatype;
  }*/

  /*interface LabelsDatatype {
    formatter: FormatterDatatype;
  }*/

  interface FormatterDatatype {
    (value: string): string;
  }

  interface DataLabels {
    formatter: FormatterDatatype;
  }

  interface SeriesDatatype {
    name: string;
    data: number[];
  }

  /*interface OrderBilanzDatatype {
    month: string;
    totalSum: number;
  }*/

  interface SupabaseOrderDatatype {
    orderDay: string;
    serviceValue: number;
    quantity: number;
  }

  /*interface ReactChartDatatype2 {
    options: OptionsDatatype;
    series: SeriesDataype[];
  }

  interface OptionsDatatype {
    chart: Chart;
    xaxis: AxisDatatype;
    colors: string[];
  }

  interface Chart {
    id: string;
  }

  interface AxisDatatype {
    categories: string[];
  }

  interface SeriesDataype {
    name: string;
    data: number[];
  }*/

  const [reactChart, setReactChart] = useState<ReactChartDatatype>({
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [],
      },

      dataLabels: {
        formatter: function (value: string): string {
          return Number(value).toLocaleString("de-DE");
        },
      },

      colors: ["#ae8625"],
    },
    series: [
      {
        name: "Monatsumsatz",
        data: [],
      },
    ],
  });

  let supabaseOrderArray: SupabaseOrderDatatype[] = [];

  /*const [orderBilanzArray, setOrderBilanzArray] = useState<
    OrderBilanzDatatype[]
  >([])*/ const companyYearReportArray: string[] = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];

  let orderMonthArray: string[] = [];
  let orderTotalSumArray: number[] = [];

  useEffect(() => {
    loadBilanzData();
  }, [supabase]);

  useEffect(() => {
    showMonthBilanz();
  }, []);

  useEffect(() => {
    //console.log(supabaseOrderArray);
  }, [supabaseOrderArray]);

  const [totalYearBilanz, setTotalYearBilanz] = useState<boolean>(false);
  const [monthSum, setMonthSum] = useState<boolean>(false);
  const totalYearSum: number = companyreportStorageObject.salesVolume || 0;
  const currentYear = new Date().getFullYear();

  function showTotalYearBilanz() {
    setTotalYearBilanz(true);
    setMonthSum(false);
  }

  function showMonthBilanz() {
    setTotalYearBilanz(false);
    setMonthSum(true);
  }

  async function loadBilanzData() {
    const { data } = await supabase
      .from("Orders")
      .select("quantity, serviceValue, orderDay");
    //console.log(data);

    /**/

    if (data) {
      supabaseOrderArray = [...data];
      //console.log(supabaseOrderArray);
      editOrderBilanz();
      calculateTotalYearSum();
    }
  }

  /*setReactChart({
        options: {
          chart: {
            id: "basic-bar",
          },
          xaxis: {
            categories: [
              ...reactChart.options.xaxis.categories,
              ...newMonthArray,
            ],
          },
        },
        series: [
          {
            name: "series-1",
            data: [...reactChart.series[0].data, ...newBilanzArray],
          },
        ],
      });*/

  /*setReactChart({
        ...reactChart,
        options: {
          ...reactChart.options,
          xaxis: {
            ...reactChart.options.xaxis,
            categories: [
              ...reactChart.options.xaxis.categories,
              ...newMonthArray,
            ],
          },
        },
        series: [
          {
            ...reactChart.series[0],
            data: [...reactChart.series[0].data, ...newBilanzArray],
          },
        ],
      });*/

  function editOrderBilanz() {
    //  Datum des Auftrages um ändern

    for (let index = 0; index < supabaseOrderArray.length; index++) {
      const getDate = new Date(supabaseOrderArray[index].orderDay);
      const editString = getDate.toISOString().slice(5, 7);
      supabaseOrderArray[index].orderDay = editString;
    }

    //console.log(supabaseOrderArray);

    console.log(supabaseOrderArray);

    let totalSumArray: number[] = new Array(12).fill(0);
    let totalSum: number = 0;

    for (let index = 0; index < supabaseOrderArray.length; index++) {
      const element = supabaseOrderArray[index];
      console.log(element);

      totalSum = element.quantity * element.serviceValue;
      console.log(totalSum);

      const singleValue = Number(element.orderDay) - 1;
      console.log(singleValue);

      totalSumArray[singleValue] += totalSum;
      console.log(totalSumArray);
    }

    console.log(totalSumArray);

    orderMonthArray = [...companyYearReportArray];
    console.log(orderMonthArray);
    orderTotalSumArray = [...totalSumArray];
    console.log(orderTotalSumArray);

    updateReactChart();
  }

  function updateReactChart() {
    const orderBilanzMonthArray = orderMonthArray.map((bilanzDetails) => {
      return bilanzDetails;
    });

    const orderBilanzSumArray = orderTotalSumArray.map((bilanzDetails) => {
      return bilanzDetails;
    });

    //setMonthArray(newArray);
    //settotalSumArray(newArray2);
    setReactChart({
      options: {
        chart: {
          id: "basic-bar",
        },
        xaxis: {
          categories: [
            ...reactChart.options.xaxis.categories,
            ...orderBilanzMonthArray,
          ],
        },

        dataLabels: {
          formatter: function (value: string) {
            return Number(value).toLocaleString("de-DE", {
              style: "currency",
              currency: "EUR",
            });
          },
        },
        colors: ["#ae8625"],
      },
      series: [
        {
          name: "Monatsumsatz",
          data: [...reactChart.series[0].data, ...orderBilanzSumArray],
        },
      ],
    });
  }

  function calculateTotalYearSum() {
    let totalSum: number = 0;

    for (let index = 0; index < supabaseOrderArray.length; index++) {
      const element = supabaseOrderArray[index];

      const singleSum: number = element.quantity * element.serviceValue;
      totalSum = singleSum + totalSum;
    }

    setCompanyreportStorageObject({
      ...companyreportStorageObject,
      salesVolume: totalSum,
    });
  }

  return (
    <div className="company-report">
      {" "}
      <h1 className="company-report__headline">Firmenbilanz</h1>
      <div className="company-report__table-div center-content-column">
        <div className="company-report__button-div center-content">
          {" "}
          <button
            onClick={showMonthBilanz}
            className="company-report__year-report-button button primary-button"
          >
            Jahresbilanz
          </button>
          <button
            onClick={showTotalYearBilanz}
            className="company-report__total-year-button button primary-button"
          >
            Umsatz {currentYear}
          </button>
        </div>

        <div className="company-report__preview">
          {totalYearBilanz && (
            <div className="company-report__short-table-div">
              <h2 className="company-report__short-headine">
                Umsatz {currentYear}
              </h2>

              <p className="company-report__short-text">
                {totalYearSum || " - "} €
              </p>
            </div>
          )}

          {monthSum && (
            <div className="company-report__chart-div">
              {" "}
              <h2 className="company-report__chart-headline">Jahresbilanz</h2>
              <Chart
                options={reactChart.options}
                series={reactChart.series}
                type="area"
                className="company-report__chart"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );

  /*  <CompanyreportPreviewComponent reactChart={reactChart} />

   yaxis: {
        labels: {
          formatter: function (value: string): string {
            return Number(value).toLocaleString("de-DE");
          },
        },
      },

   yaxis: {
          labels: {
            formatter: function (value: string) {
              return Number(value).toLocaleString("de-DE", {
                style: "currency",
                currency: "EUR",
              });
            },
          },
        },
  */
}
