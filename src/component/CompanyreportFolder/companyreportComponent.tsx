import { useEffect, useState } from "react";
import { supabase } from "../../supabase";
import { Tables } from "../../database.types";
import CompanyreportPreviewComponent from "./companyreportPreviewComponent";
import { companyreportContext } from "./companyreportContext";

export default function CompanyreportComponent() {
  const [companyreportStorageObject, setCompanyreportStorageObject] = useState<
    Tables<"Companyreport">
  >({ id: 0, Jahresumsatz: 0 });

  interface StateDatatype {
    options: OptionsDatatype;
    series: SeriesDatatype[];
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

  interface SeriesDatatype {
    name: string;
    data: number[];
  }

  interface OrderBilanzDatatype {
    month: string;
    totalSum: number;
  }

  interface SupabaseOrderDatatype {
    Bestehldatum: string;
    Dienstleistungswert: number;
    Bestehlmenge: number;
  }

  const [reactChart, setReactChart] = useState<StateDatatype>({
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [],
      },
      colors: ["#ae8625"],
    },
    series: [
      {
        name: "series-1",
        data: [],
      },
    ],
  });

  let supabaseOrderArray: SupabaseOrderDatatype[] = [];

  const [orderBilanzArray, setOrderBilanzArray] = useState<
    OrderBilanzDatatype[]
  >([]);

  const companyYearReportArray: string[] = [
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
    //console.log(supabaseOrderArray);
  }, [supabaseOrderArray]);

  async function loadBilanzData() {
    const { data } = await supabase
      .from("Orders")
      .select("Bestehlmenge, Dienstleistungswert, Bestehldatum");
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
      const getDate = new Date(supabaseOrderArray[index].Bestehldatum);
      const editString = getDate.toISOString().slice(5, 7);
      supabaseOrderArray[index].Bestehldatum = editString;
    }

    //console.log(supabaseOrderArray);

    console.log(supabaseOrderArray);

    let totalSumArray: number[] = new Array(12).fill(0);
    let totalSum: number = 0;

    for (let index = 0; index < supabaseOrderArray.length; index++) {
      const element = supabaseOrderArray[index];
      console.log(element);

      totalSum = element.Bestehlmenge * element.Dienstleistungswert;
      console.log(totalSum);

      const singleValue = Number(element.Bestehldatum) - 1;
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
        colors: ["#ae8625"],
      },
      series: [
        {
          name: "series-1",
          data: [...reactChart.series[0].data, ...orderBilanzSumArray],
        },
      ],
    });
  }

  function calculateTotalYearSum() {
    let totalSum: number = 0;

    for (let index = 0; index < supabaseOrderArray.length; index++) {
      const element = supabaseOrderArray[index];

      const singleSum: number =
        element.Bestehlmenge * element.Dienstleistungswert;
      totalSum = singleSum + totalSum;
    }

    setCompanyreportStorageObject({
      ...companyreportStorageObject,
      Jahresumsatz: totalSum,
    });
  }

  return (
    <div>
      <companyreportContext.Provider
        value={{ companyreportStorageObject, setCompanyreportStorageObject }}
      >
        {" "}
        <h1>Firmenbilanz</h1>
        <CompanyreportPreviewComponent reactChart={reactChart} />
      </companyreportContext.Provider>
    </div>
  );
}
