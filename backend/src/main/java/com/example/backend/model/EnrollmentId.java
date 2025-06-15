package com.example.backend.model;

// EnrollmentId.java
import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.Setter;
import java.io.Serializable;
import java.util.Objects;

@Getter
@Setter
@Embeddable
public class EnrollmentId implements Serializable {
    private Long user;
    private Long course;

    public EnrollmentId() {}
    public EnrollmentId(Long user, Long course) {
        this.user = user;
        this.course = course;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof EnrollmentId that)) return false;
        return Objects.equals(user, that.user) &&
                Objects.equals(course, that.course);
    }

    @Override
    public int hashCode() {
        return Objects.hash(user, course);
    }
}
