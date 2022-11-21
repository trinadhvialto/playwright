$mypath = Split-Path -Parent $MyInvocation.MyCommand.Path
Import-Module "$mypath\..\CustomWait.psm1"
BeforeAll {
    $Script:SubscriptionPrefix = $env:subsriptionprefix
    $Script:environment = $env:environment
    $Script:locationShortCut = $env:locationshortcut
    $Script:resourceGroup = "$Script:SubscriptionPrefix-conm-$Script:environment-$Script:locationShortCut-resources-rg"
    $Script:iotHub = "$Script:SubscriptionPrefix-conm-$Script:environment-$Script:locationShortCut-iothub-aih"
    $Script:iotDeviceId = "$Script:SubscriptionPrefix-conm-$Script:environment-testdevice"
    $Script:moduleId = 'managementmodule'
    $Script:directMethodName = "GetHttpConnectivityStatus"
    $Script:networkdiagDirectMethod = "NetworkDiagnosis"
    $Script:hypervDeviceId = $env:regularUserHypervDeviceId
    $Script:VMresourceGroup = $env:vmrgname
    $Script:vmName = "${Script:SubscriptionPrefix}conm${Script:environment}${Script:locationShortCut}vmtestdevice";
    $Script:initialDesiredProperties = Get-AzIotHubModuleTwin -ResourceGroupName "$Script:resourceGroup" -IotHubName "$Script:iotHub" -DeviceId "$Script:iotDeviceId" -ModuleId "$Script:moduleId"

}
Describe 'Module tests' {
    Context 'Direct Method' {
        It 'should be invoked successfully' { 
            $payload = '{"uri": "https://www.bing.com"}' 
            $response = Invoke-AzIotHubModuleMethod -ResourceGroupName "$Script:resourceGroup" -IotHubName "$Script:iotHub" -DeviceId "$Script:iotDeviceId" -ModuleId "$Script:moduleId" -Name "$Script:directMethodName" -Payload "$payload" -ResponseTimeOut 20 -ConnectionTimeOut 15
            $response.Status | Should -Be "200"
            ($response.payload | ConvertFrom-Json).result | Should -Be "Executed direct method: Successful"
        } -Tag 'US#test19378'
        It 'should return error when payload do not have absolute uri' {
            $payload = '{"uri": "www.bing.com"}' 
            $response = Invoke-AzIotHubModuleMethod -ResourceGroupName "$Script:resourceGroup" -IotHubName "$Script:iotHub" -DeviceId "$Script:iotDeviceId" -ModuleId "$Script:moduleId" -Name "$Script:directMethodName" -Payload "$payload" -ResponseTimeOut 20 -ConnectionTimeOut 15
            $response.Status | Should -Be "400"
            ($response.payload | ConvertFrom-Json).result | Should -Be "Executed direct method: An invalid request URI was provided. Either the request URI must be an absolute URI or BaseAddress must be set."
        } -Tag 'US#test19378'
        It 'should return error when payload is empty' {
            $payload = '{}' 
            $response = Invoke-AzIotHubModuleMethod -ResourceGroupName "$Script:resourceGroup" -IotHubName "$Script:iotHub" -DeviceId "$Script:iotDeviceId" -ModuleId "$Script:moduleId" -Name "$Script:directMethodName" -Payload "$payload" -ResponseTimeOut 20 -ConnectionTimeOut 15
            $response.Status | Should -Be "400"
            ($response.payload | ConvertFrom-Json).result | Should -Be "Executed direct method: Either URI is not provided or it does not have a key 'Uri'."
        } -Tag 'US#test19378'
        It 'should return error when payload attribute is missing' {
            $response = Invoke-AzIotHubModuleMethod -ResourceGroupName "$Script:resourceGroup" -IotHubName "$Script:iotHub" -DeviceId "$Script:iotDeviceId" -ModuleId "$Script:moduleId" -Name "$Script:directMethodName" -ResponseTimeOut 20 -ConnectionTimeOut 15
            $response.Status | Should -Be "400"
            ($response.payload | ConvertFrom-Json).result | Should -Be "Executed direct method: Either URI is not provided or it does not have a key 'Uri'."
        } -Tag 'US#test19378'
        It 'should return error when payload has no uri key' {
            $payload = '{"link": "www.bing.com"}'
            $response = Invoke-AzIotHubModuleMethod -ResourceGroupName "$Script:resourceGroup" -IotHubName "$Script:iotHub" -DeviceId "$Script:iotDeviceId" -ModuleId "$Script:moduleId" -Name "$Script:directMethodName" -Payload "$payload" -ResponseTimeOut 20 -ConnectionTimeOut 15
            $response.Status | Should -Be "400"
            ($response.payload | ConvertFrom-Json).result | Should -Be "Executed direct method: Either URI is not provided or it does not have a key 'Uri'."
        } -Tag 'US#test19378'
        It 'should return error when uri value is white spaces' {
            $payload = '{"uri": " " }'
            $response = Invoke-AzIotHubModuleMethod -ResourceGroupName "$Script:resourceGroup" -IotHubName "$Script:iotHub" -DeviceId "$Script:iotDeviceId" -ModuleId "$Script:moduleId" -Name "$Script:directMethodName" -Payload "$payload" -ResponseTimeOut 20 -ConnectionTimeOut 15
            $response.Status | Should -Be "400"
            ($response.payload | ConvertFrom-Json).result | Should -Be "Executed direct method: Either URI is not provided or it does not have a key 'Uri'."
        } -Tag 'US#test19378'
                
    }

    Context 'Infrastructure details' {
        BeforeAll {
            $Script:query = "select * from devices.modules where devices.deviceId = '$Script:iotDeviceId' and moduleId='$Script:moduleId'"
            $initialDesiredProperties = Get-AzIotHubModuleTwin -ResourceGroupName "$Script:resourceGroup" -IotHubName "$Script:iotHub" -DeviceId "$Script:iotDeviceId" -ModuleId "$Script:moduleId"
            $main = @{}
            $main.Add("current", $initialDesiredProperties.Properties.Desired["initial"])
            $main.current["messageDelay"] = 2
            Write-Host($main.current["messageDelay"].ToString())
            
            CustomWait -iotDeviceId "$Script:iotDeviceId" -moduleId "$Script:moduleId" -resourceGroup "$Script:resourceGroup" -iotHub "$Script:iotHub" -updatedDesiredProperty $main -property "infrastructure"
            
            $Script:queryResult1 = Invoke-AzIotHubQuery -ResourceGroupName "$Script:resourceGroup" -IotHubName "$Script:iotHub" -Query "$Script:query"
            $Script:messageDelay1 = ($Script:queryResult1 | ConvertFrom-Json).properties.desired.current.messageDelay
            Start-Sleep ($Script:messageDelay1 * 60) #Converting sleep time into Seconds as MessageDelay is in Minutes
            $Script:queryResult2 = Invoke-AzIotHubQuery -ResourceGroupName "$Script:resourceGroup" -IotHubName "$Script:iotHub" -Query "$Script:query"
        }
        It 'should be present in the reported properties' {                   
            # Verifying the reported Infrastructure properties are not null in the first period
            ($Script:queryResult1 | ConvertFrom-Json).properties.reported.TotalMemory | Should -Not -BeNullOrEmpty
            ($Script:queryResult1 | ConvertFrom-Json).properties.reported.AvailableMemory | Should -Not -BeNullOrEmpty
            ($Script:queryResult1 | ConvertFrom-Json).properties.reported.IPAddress | Should -Not -BeNullOrEmpty
            ($Script:queryResult1 | ConvertFrom-Json).properties.reported.HostName | Should -Not -BeNullOrEmpty
            # Verifying the reported Infrastructure properties are not null in the next period
            ($Script:queryResult2 | ConvertFrom-Json).properties.reported.TotalMemory | Should -Not -BeNullOrEmpty
            ($Script:queryResult2 | ConvertFrom-Json).properties.reported.AvailableMemory | Should -Not -BeNullOrEmpty
            ($Script:queryResult2 | ConvertFrom-Json).properties.reported.IPAddress | Should -Not -BeNullOrEmpty
            ($Script:queryResult2 | ConvertFrom-Json).properties.reported.HostName | Should -Not -BeNullOrEmpty              
        } -Tag 'US#test19378'
        It 'should be reported periodically' {   
            #Get the timeStamps of the Infrastructure details in Reported properties in the first period
            $TotalMemoryTimestamp1 = [DateTime] ($Script:queryResult1 | ConvertFrom-Json).properties.reported.'$metadata'.TotalMemory.'$lastUpdated'
            $AvailableMemoryTimestamp1 = [DateTime] ($Script:queryResult1 | ConvertFrom-Json).properties.reported.'$metadata'.AvailableMemory.'$lastUpdated'
            $IPAddressTimestamp1 = [DateTime] ($Script:queryResult1 | ConvertFrom-Json).properties.reported.'$metadata'.IPAddress.'$lastUpdated'
            $HostNameTimestamp1 = [DateTime] ($Script:queryResult1 | ConvertFrom-Json).properties.reported.'$metadata'.HostName.'$lastUpdated'
            #Get the timeStamps of the Infrastructure details in Reported properties in the next period
            $TotalMemoryTimestamp2 = [DateTime] ($Script:queryResult2 | ConvertFrom-Json).properties.reported.'$metadata'.TotalMemory.'$lastUpdated'
            $AvailableMemoryTimestamp2 = [DateTime] ($Script:queryResult2 | ConvertFrom-Json).properties.reported.'$metadata'.AvailableMemory.'$lastUpdated'
            $IPAddressTimestamp2 = [DateTime] ($Script:queryResult2 | ConvertFrom-Json).properties.reported.'$metadata'.IPAddress.'$lastUpdated'
            $HostNameTimestamp2 = [DateTime] ($Script:queryResult2 | ConvertFrom-Json).properties.reported.'$metadata'.HostName.'$lastUpdated'
            #Verify the Message Delay
            $min = $Script:messageDelay1;
            $max = $Script:messageDelay1 + 1; 
            Write-Host ("Infrastructure details should be reported periodically")
            Write-Host("TotalMemoryTimestamp1 $TotalMemoryTimestamp1  TotalMemoryTimestamp2 $TotalMemoryTimestamp2")
            Write-Host("AvailableMemoryTimestamp1  $AvailableMemoryTimestamp1   AvailableMemoryTimestamp2  $AvailableMemoryTimestamp2 ")
            Write-Host("IPAddressTimestamp1  $IPAddressTimestamp1   IPAddressTimestamp2  $IPAddressTimestamp2 ")
            Write-Host("HostNameTimestamp1  $HostNameTimestamp1   HostNameTimestamp2  $HostNameTimestamp2 ")
            Write-Host("Min - $min ; Max - $max")
            [int]($TotalMemoryTimestamp2 - $TotalMemoryTimestamp1).TotalMinutes | Should -BeIn ($min..$max)
            [int]($AvailableMemoryTimestamp2 - $AvailableMemoryTimestamp1).TotalMinutes | Should -BeIn ($min..$max)
            [int]($IPAddressTimestamp2 - $IPAddressTimestamp1).TotalMinutes | Should -BeIn ($min..$max)
            [int]($HostNameTimestamp2 - $HostNameTimestamp1).TotalMinutes | Should -BeIn ($min..$max)
        } -Tag 'US#test19378'
    }
 
  
}