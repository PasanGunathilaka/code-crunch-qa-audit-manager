"use-client";
import DeployButton from "../components/DeployButton";
import AuthButton from "../components/AuthButton";
// import { createClient } from "@/utils/supabase/server";
import ConnectSupabaseSteps from "@/components/tutorial/ConnectSupabaseSteps";
import SignUpUserSteps from "@/components/tutorial/SignUpUserSteps";
import Header from "@/components/Header";
import { createClient } from "@/utils/supabase/client";
import Home from "@/components/home";
import { redirect } from "next/navigation";
export default async function Index() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: QualityAuditList } = await supabase
    .from("QualityAuditList")
    .select();


    if (!user) {
      return redirect("/login");
    }
  
 
  

  console.log("data", QualityAuditList);
  
  // useEffect(() => {
  //   fetchAudits();
  // }, []);
  // console.log("auditlist", auditlist);
  // async function fetchAudits() {
  //   const { data } = await createClient.from("QualityAuditList").select("*");
  //   setAuditList(data);
  // }

  // return<><Home/></>;
}
