var web3;
var token;
const TokenContractABI = [{"constant":false,"inputs":[{"name":"addr","type":"address"},{"name":"state","type":"bool"}],"name":"setTransferAgent","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"mintingFinished","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"addr","type":"address"}],"name":"setReleaseAgent","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"receiver","type":"address"},{"name":"amount","type":"uint256"}],"name":"mint","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"mintAgents","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"addr","type":"address"},{"name":"state","type":"bool"}],"name":"setMintAgent","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"value","type":"uint256"}],"name":"upgrade","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_name","type":"string"},{"name":"_symbol","type":"string"}],"name":"setTokenInformation","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"upgradeAgent","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"releaseTokenTransfer","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"upgradeMaster","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getUpgradeState","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"transferAgents","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"released","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"canUpgrade","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_addedValue","type":"uint256"}],"name":"addApproval","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"totalUpgraded","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"releaseAgent","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"agent","type":"address"}],"name":"setUpgradeAgent","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_subtractedValue","type":"uint256"}],"name":"subApproval","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"master","type":"address"}],"name":"setUpgradeMaster","outputs":[],"payable":false,"type":"function"},{"inputs":[{"name":"_name","type":"string"},{"name":"_symbol","type":"string"},{"name":"_initialSupply","type":"uint256"},{"name":"_decimals","type":"uint256"}],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"newName","type":"string"},{"indexed":false,"name":"newSymbol","type":"string"}],"name":"UpdatedTokenInformation","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Upgrade","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"agent","type":"address"}],"name":"UpgradeAgentSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"receiver","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"Minted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"}];
const TokenContractAddress = '0xa645264C5603E96c3b0B078cdab68733794B0A71';
var addressElement;
var balanceElement;
var amountElement;
var txDataElement;

$( document ).ready(function() {
    addressElement = $('#address');
    balanceElement = $('#balance');
    amountElement = $('#amount');
    txDataElement = $('#txData');
    addressElement.val('');
    clearFields();

    addressElement.on('input paste',function(e){
        addressElement.removeClass('is-valid is-invalid');
        var address = addressElement.val();
        var checksumAddress;
        try {
            checksumAddress = web3.utils.toChecksumAddress(address);
        }
        catch (e) {
            addressElement.addClass('is-invalid');
            clearFields();
            return;
        }
        addressElement.addClass('is-valid');
        showAddressBalance(checksumAddress);
    });

    $('#createTxData').click(function(){
        amountElement.removeClass('is-invalid');
        $('#amountError').hide();

        var amount = amountElement.val();
        var balance = balanceElement.val();
        var validNumber = !isNaN(amount);

        if (!validNumber) {
            amountElement.addClass('is-invalid');
            $('#amountError').text('Invalid value.').show();
            amountElement.focus();
            return;
        }

        if (amount <= 0) {
            amountElement.addClass('is-invalid');
            $('#amountError').text('Value have to be > 0.').show();
            amountElement.focus();
            return;
        }

        if (amount > balance) {
            amountElement.addClass('is-invalid');
            $('#amountError').text('Value cannot exceed balance value.').show();
            amountElement.focus();
            return;
        }

        var txData = encodeTxData(toAtomic(amount));
        txDataElement.val(txData);
    });

    $('#entire').click(function(e) {
        amountElement.val(balanceElement.val());
        e.preventDefault();
    });

    web3 = new Web3('https://mainnet.infura.io/v3/1786ccd330d34c618dfb9af336fb4d86');
    token = new web3.eth.Contract(TokenContractABI, TokenContractAddress);
});

function fromAtomic(balance) {
    return balance / 100000000;
}

function toAtomic(balance) {
    return balance * 100000000;
}

function showAddressBalance(address) {
    token.methods.balanceOf(address).call()
    .then(function (balance) {
        $('#amount, #balance').val(fromAtomic(balance));
    }).catch(function(e) {
        console.log(e);
    });
}

function encodeTxData(amount) {
    return token.methods.upgrade(amount).encodeABI();
}

function clearFields() {
    balanceElement.val('');
    amountElement.val('');
    txDataElement.val('');
}