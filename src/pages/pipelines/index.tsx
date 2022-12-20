import { useSession } from "next-auth/react";
import Header from "../../components/header";
import NotLoggedIn from "../../components/NotLoggedIn";
import PipelineLinks from "../../components/pipelineLinks";

const Pipelines = () => {
  const { data: sessionData } = useSession();

  if (sessionData?.user) {
    return (
      <div>
        <Header title="Pipelines" />
        <div id="body">
          <PipelineLinks />
        </div>
      </div>
    );
  } else {
    return <NotLoggedIn />
  }
};

export default Pipelines;
