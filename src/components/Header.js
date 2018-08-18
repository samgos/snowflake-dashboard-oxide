import React, { Component } from 'react';
import { withWeb3 } from 'web3-webpacked-react';
import Typography from '@material-ui/core/Typography';
import { getContract, linkify } from '../common/utilities'

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      etherBalance: undefined,
      hydroBalance: undefined
    }

    this.linkify = linkify.bind(this)
    this.getContract = getContract.bind(this)

    this.props.w3w.getERC20Balance(this.getContract('token')._address)
      .then(balance => {
        this.setState({hydroBalance: Number(balance).toLocaleString(undefined, { maximumFractionDigits: 3 })})
      })

    this.props.w3w.getBalance()
      .then(balance => {
        this.setState({etherBalance: Number(balance).toLocaleString(undefined, { maximumFractionDigits: 3 })})
      })

    this.props.getHydroId()
  }

  render() {
    const networkName = this.props.w3w.getNetworkName()
    const snowflakeAddress = this.getContract('snowflake')._address

    return (
      <div>
        <Typography variant='display3' gutterBottom align="center" color="textPrimary">
          Snowflake Dashboard ({this.linkify('address', snowflakeAddress, networkName, 'display3')})
        </Typography>
        <Typography variant="subheading" gutterBottom align="center" color="textPrimary">
          {this.linkify('address', this.props.w3w.account, undefined, 'subheading')}
        </Typography>
        <Typography variant="subheading" gutterBottom align="center" color="textPrimary">
          {this.props.hydroId}
        </Typography>
        <Typography variant="subheading" gutterBottom align="center" color="textPrimary">
          Ether: {this.state.etherBalance}
        </Typography>
        <Typography variant="subheading" gutterBottom align="center" color="textPrimary">
          Hydro: {this.state.hydroBalance}
        </Typography>
      </div>
    )
  }
}

export default withWeb3(Header)
