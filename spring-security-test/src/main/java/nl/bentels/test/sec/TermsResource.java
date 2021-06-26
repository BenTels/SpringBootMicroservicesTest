package nl.bentels.test.sec;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.springframework.context.annotation.Role;
import org.springframework.http.MediaType;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController("/terms")
public class TermsResource {

	private static final List<String> TERMS = new ArrayList<>();
	
	@GetMapping(path="/terms", produces = MediaType.APPLICATION_JSON_VALUE)
	public List<String> getAllTerms() {
		return Collections.unmodifiableList(TERMS);
	}
	
	@PostMapping(path = "/terms/{term}")
	@Secured({"ROLE_USER", "ROLE_ADMIN"})
	public void addTerm(@PathVariable("term") String newTerm) {
		synchronized (TERMS) {
			TERMS.add(newTerm);
		}
	}
	
	@DeleteMapping(path = "/terms")
	@Secured("ROLE_ADMIN")
	public void clearTerms() {
		synchronized (TERMS) {
			TERMS.clear();
		}
	}
}
