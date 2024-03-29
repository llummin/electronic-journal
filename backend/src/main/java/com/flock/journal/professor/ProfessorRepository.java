package com.flock.journal.professor;

import com.flock.journal.group.Group;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ProfessorRepository extends JpaRepository<Professor, Long> {

  @Query("SELECT g FROM Group g JOIN g.lessons l WHERE l.professor.id = :professorId")
  List<Group> findGroupsByProfessorId(@Param("professorId") Long professorId);

  @Query("SELECT p FROM Professor p WHERE p.user.id = :userId")
  Optional<Professor> findByUserId(@Param("userId") Long userId);
}