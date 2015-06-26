library(XML)
library(data.table)

xml.url <- "http://www.fedstat.ru/opendata/7708234640-threeaoneazeroatwoaeight/data-2015-04-23-structure-2015-04-23.xml"
xmlfile <- xmlTreeParse(xml.url)
xmltop = xmlRoot(xmlfile)

plantcat <- xmlSApply(xmltop, function(x) xmlSApply(x, xmlValue))

plantcat_df <- data.frame(t(plantcat),row.names=NULL)
plantcat_df[1:5,1:4]

filename <- paste(getwd(),"/opendata/psyLicenses.csv", sep="")
psyLicenses <- read.csv(filename, header = T, sep=";")
