const hre = require('hardhat')

async function main() {
	const [deployer] = await hre.ethers.getSigners()

	console.log('Deploying contracts with the account:', deployer.address)
	console.log('Account balance:', (await deployer.getBalance()).toString())

	const network = await hre.ethers.provider.getNetwork
	console.log('Network:', network.name)

	//Deploy the contract
	console.log('Deploying TokenICO contract...')
	const TokenICO = await hre.ethers.getContractFactory('TokenICO')
	const tokenICO = await TokenICO.deploy()

	await tokenICO.deployed()
	console.log('TokenICO deployed to:', tokenICO.address)
	console.log('Owner address', deployer.address)

	//Token deployment
	console.log('Deploying MyToken contract...')
	const MyToken = await hre.ethers.getContractFactory('MyToken')
	const myToken = await MyToken.deploy()

	await myToken.deployed()
	console.log('MyToken deployed to:', myToken.address)
	console.log('Owner address', deployer.address)
}

main()
	.then(() => process.exit(0))
	.catch(error => {
		console.error(error)
		process.exit(1)
	})
