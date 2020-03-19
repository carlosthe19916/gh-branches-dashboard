import { connect } from "react-redux";
import { createMapStateToProps } from "../../store/common";
import {
  contextRepositoryActions,
  contextRepositorySelectors
} from "../../store/contextRepository";
import { ContextRepositoryLoader } from "./ContextRepositoryLoader";

const mapStateToProps = createMapStateToProps(state => ({
  ctxRepositoryError: contextRepositorySelectors.error(state),
  ctxRepositoryFetchStatus: contextRepositorySelectors.fetchStatus(state)
}));

const mapDispatchToProps = {
  fetchCtxRepository: contextRepositoryActions.fetchContextRepository
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContextRepositoryLoader);
