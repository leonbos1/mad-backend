package nl.hanze.se4.automaat.domain;

import java.util.Random;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicLong;

public class RouteStopTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));
    private static final AtomicInteger intCount = new AtomicInteger(random.nextInt() + (2 * Short.MAX_VALUE));

    public static RouteStop getRouteStopSample1() {
        return new RouteStop().id(1L).nr(1);
    }

    public static RouteStop getRouteStopSample2() {
        return new RouteStop().id(2L).nr(2);
    }

    public static RouteStop getRouteStopRandomSampleGenerator() {
        return new RouteStop().id(longCount.incrementAndGet()).nr(intCount.incrementAndGet());
    }
}
