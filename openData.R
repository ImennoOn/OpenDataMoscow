library(XML)
library(data.table)
library(dplyr)
library(ggplot2)


xml.url <- "http://www.fedstat.ru/opendata/7708234640-threeaoneazeroatwoaeight/data-2015-04-23-structure-2015-04-23.xml"
xmlfile <- xmlTreeParse(xml.url)
xmltop = xmlRoot(xmlfile)

plantcat <- xmlSApply(xmltop, function(x) xmlSApply(x, xmlValue))

plantcat_df <- data.frame(t(plantcat),row.names=NULL)
plantcat_df[1:5,1:4]

filename <- paste(getwd(),"/opendata/psyLicenses.csv", sep="")
psyLicenses <- data.frame(read.csv(filename, header = T, sep=";"))

df <- psyLicenses %>% select(ROWNUM, Address) %>% 
  mutate(Address=as.character(Address)) %>%
  filter(nchar(Address) <= 6) %>%
  mutate(first3 = substr(Address,0,3), first4 = substr(Address,0,4))

groupedBy3 <- df %>% group_by(first3) %>% summarise(count = n())
groupedBy4 <- df %>% group_by(first4) %>% summarise(count = n())

qplot(groupedBy4$count, geom = "histogram")
ggplot(groupedBy4, aes(groupedBy4$count)) + geom_histogram() + theme_bw()
    