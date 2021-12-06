![](https://img.shields.io/badge/STATUS-NOT%20CURRENTLY%20MAINTAINED-red.svg?longCache=true&style=flat)

# Important Notice
This public repository is read-only and no longer maintained. For the latest sample code repositories, visit the [SAP Samples](https://github.com/SAP-samples) organization.

# SAP Developers, Sample 1
Sample application for GAE and HXE. This following example is a skeleton or shell for use in creating a Node.js based application for deploymenet on the Google App Engine with a connectivity to an [SAP HANA express edition server](https://console.cloud.google.com/launcher/details/sap-public/sap-hana-express?project=hana-express-cloud) running within the Google Cloud Platform, Compute Engine.

This shell is provided "as-is". For more information on working with SAP technologies please vist the [SAP Developer Center](http://developers.sap.com) at [developers.sap.com](http://developers.sap.com).

GAE is the Google App Engine, [https://cloud.google.com/appengine/docs/](https://cloud.google.com/appengine/docs/) 

> Build modern web and mobile applications on an open cloud platform: bring your own language runtimes, frameworks, and third party libraries. Google App Engine is a fully managed platform that completely abstracts away infrastructure so you focus only on code. Go from zero to planet-scale and see why some of today’s most successful companies power their applications on App Engine.

HXE is the SAP HANA, express edition [https://www.sap.com/developer/topics/sap-hana-express.html](https://www.sap.com/developer/topics/sap-hana-express.html)

> SAP HANA, express edition is a streamlined version of SAP HANA that can run on laptops and other resource-constrained hosts.

Tested Node.js version
* 4.0.0
* 4.5.0
* 6.0.0

Node module dependencies
* async v2.1.5
* express v4.15.2
* hdb v0.12.1

# Configuration

Modify the **config.json** file located in the **lib** folder of the application to indicate the IP or hostname of your SAP HANA express edition server as well as the tenant database and appropriate username and password followed by the port number for the communication of the HDB client to the server.

````
{
  "host": "xx.xx.xx.xx",
  "port": 3xx15,
  "user": "xxxxxxx",
  "database": "xxx",
  "password": "xxxxxxxxxxx"
} 
````

For more information, see the following posts
* [https://blogs.sap.com/2017/03/24/march-tip-sql-clients-and-sap-hana-2.0/](https://blogs.sap.com/2017/03/24/march-tip-sql-clients-and-sap-hana-2.0/)


# Execution 
To run execute "npm start" from your command line.

# Additional SQL Commands that might be of interest

````
select TO_VARCHAR((ROUND(d.total_size/1024/1024/1024, 2) - ROUND(d.used_size/1024/1024/1024,2))) as FREESPACE from ( ( m_volumes as v1 join M_VOLUME_SIZES as v2 on v1.volume_id = v2.volume_id ) right outer join m_disks as d on d.disk_id = v2.disk_id ) where d.usage_type = 'DATA' group by v1.host, d.usage_type, d.total_size,    d.device_id, d.path, d.used_size";
````

````
select TO_VARCHAR(ROUND((FREE_PHYSICAL_MEMORY) /1024/1024/1024, 2)) AS FREEMEM from PUBLIC.M_HOST_RESOURCE_UTILIZATION";
````

````
SELECT COUNT(ALERT_DETAILS) as ALERTCOUNT FROM _SYS_STATISTICS.STATISTICS_CURRENT_ALERTS";
````

````
SELECT COUNT(CONNECTION_ID) as STATUS FROM SYS.M_CONNECTIONS WHERE CONNECTION_STATUS = 'RUNNING'";
````
