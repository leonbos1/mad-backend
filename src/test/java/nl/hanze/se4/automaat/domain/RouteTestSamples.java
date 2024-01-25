package nl.hanze.se4.automaat.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class RouteTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static Route getRouteSample1() {
        return new Route().id(1L).code("code1").description("description1");
    }

    public static Route getRouteSample2() {
        return new Route().id(2L).code("code2").description("description2");
    }

    public static Route getRouteRandomSampleGenerator() {
        return new Route().id(longCount.incrementAndGet()).code(UUID.randomUUID().toString()).description(UUID.randomUUID().toString());
    }
}
