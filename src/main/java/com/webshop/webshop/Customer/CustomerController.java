package com.webshop.webshop.Customer;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/webshop")
public class CustomerController {
	
	@Resource 
	CustomerDaoImpl customerService;

	@GetMapping(value = "/customerList")
	public List<Customer> getCustomer() {
		return customerService.findAll();

	}
	
	@PostMapping(value = "/createCustomer")
	public void createCustomer(@RequestBody Customer customer) {
		customerService.createCustomer(customer);
	}
}
