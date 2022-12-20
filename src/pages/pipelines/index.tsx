import Header from "../../components/header";
import PipelineLinks from "../../components/pipelineLinks";

const Pipelines = () => {
  return (
    <div>
      <Header title="Pipelines" />
      <div id="body">
        <PipelineLinks />
      </div>
    </div>
  );
};

export default Pipelines;
