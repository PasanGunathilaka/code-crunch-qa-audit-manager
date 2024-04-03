import React from "react";
import ChartComponent from "../ChartComponent";
import { createClient } from "@/utils/supabase/client";

const data = [
  {
    id: 1,
    item_name: "Are the Project's objectives and requirements been reviewed?\n",
    owner: "\tProject Manager\n",
    status: "Yes",
    comments: "Kanishka Is reviewing\n",
    type: "Initial Planning",
  },
  {
    id: 2,
    item_name: "Is the Software Product Development process established? \n",
    owner: "Tech Lead",
    status: "Yes",
    comments: null,
    type: "Initial Planning",
  },
  {
    id: 3,
    item_name: "What is the defined testing scope?",
    owner: "QA Engineer",
    status: "Yes",
    comments: null,
    type: "Initial Planning",
  },
  {
    id: 4,
    item_name: "Is the Test environment ready? (hardware, software, network)",
    owner: "QA Engineer",
    status: "No",
    comments: null,
    type: "Required resources",
  },
];

const ChartView: React.FC = () => {
  return (
    <div>
      <h1>Overview</h1>
      <ChartComponent data={data} />
    </div>
  );
};

export default ChartView;
