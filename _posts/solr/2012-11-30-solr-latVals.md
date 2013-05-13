---
layout: post
title: Solr-GeoHash 经纬度距离计算公式
tags: 
- solr
- lucene
- 搜索引擎
- 经纬度
categories:
- code
- solr 
UUID: 201211302340
date: 2012-11-30
---
geohash作为Solr的位置信息搜索算法，有必要了解其基本的实现原理。geohash算法的wiki链接为http://en.wikipedia.org/wiki/Geohash

<pre id="java">
public class Distance {
  public static final double DEGREES_TO_RADIANS = Math.PI / 180.0;
  public static final double RADIANS_TO_DEGREES = 180.0 / Math.PI;
  //地球半径
  public static final double EARTH_MEAN_RADIUS_KM = 6371.009;
  //地球直径
  private static final double EARTH_MEAN_DIAMETER = EARTH_MEAN_RADIUS_KM * 2;

  /***
  * 距离半径计算方式
  * @param latCenterRad  中心点经纬度
  * @param lonCenterRad
  * @param latVals  目标经纬度
  * @param lonVals
  * @return 两坐标的距离 单位千米
  */
  public static double doubleVal(double latCenterRad, double lonCenterRad, double latVals, double lonVals) {
      //计算经纬度
      double latRad = latVals * DEGREES_TO_RADIANS;
      double lonRad = lonVals * DEGREES_TO_RADIANS;

      //计算经纬度的差
      double diffX = latCenterRad * DEGREES_TO_RADIANS - latRad;
      double diffY = lonCenterRad * DEGREES_TO_RADIANS - lonRad;
      //计算正弦和余弦
      double hsinX = Math.sin(diffX * 0.5);
      double hsinY = Math.sin(diffY * 0.5);
      double latCenterRad_cos = Math.cos(latCenterRad * DEGREES_TO_RADIANS);
      double h = hsinX * hsinX
      + (latCenterRad_cos * Math.cos(latRad) * hsinY * hsinY);

      return (EARTH_MEAN_DIAMETER * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h)));
  }
}
</pre>
