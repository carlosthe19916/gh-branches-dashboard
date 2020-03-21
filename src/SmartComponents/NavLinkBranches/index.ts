import { connect } from "react-redux";
import { createMapStateToProps } from "../../store/common";
import {
    contextRepositorySelectors
} from "../../store/contextRepository";
import { NavLinkBranches } from "./NavLinkBranches";

const mapStateToProps = createMapStateToProps(state => ({
    ctxRepository: contextRepositorySelectors.repository(state)
}));

const mapDispatchToProps = {};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NavLinkBranches);