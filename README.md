# U.S. Currency Exchange Rates as maintained by the Federal Reserve

Lists daily rates for major currencies since 1971 as HTML tables.

You can view the snapshot here:

http://wgetsnaps.github.io/federalreserve.gov--foreign-exchange-rates-h10/releases/h10/hist/


Original landing page:

https://www.federalreserve.gov/releases/h10/hist/



# Bash script and wget code

```sh
wget --page-requisites \
     --adjust-extension \
     --convert-links \
     --backup-converted \
     --recursive --level 1 \
     --no-parent \
     --no-host-directories \
     https://www.federalreserve.gov/releases/h10/hist/default.htm |
     tee ./wget.log


wget --page-requisites \
     --adjust-extension \
     --convert-links \
     --backup-converted \
     --recursive --level 1 \
     --no-parent \
     --no-host-directories \
     https://www.federalreserve.gov/releases/h10/hist/default1999.htm |
     tee -a ./wget.log


wget --page-requisites \
     --adjust-extension \
     --convert-links \
     --backup-converted \
     --recursive --level 1 \
     --no-parent \
     --no-host-directories \
     https://www.federalreserve.gov/releases/h10/hist/default1989.htm |
     tee -a ./wget.log
```




